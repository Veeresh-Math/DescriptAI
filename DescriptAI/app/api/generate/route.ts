import { NextResponse } from "next/server";

import { auth, currentUser } from "@/lib/auth-server";
import { db } from "@/lib/db";
import { getRandomPremiumSecret } from "@/lib/knowledge-vault";
import { getStaticFallback } from "@/lib/resource-fallback";
import { crawlMarketingInspiration } from "@/lib/web-crawler";

import { findSyncInsights } from "@/lib/intelligence-sync";

export const dynamic = "force-dynamic";

// DeepSeek API call (PRIMARY - FREE)
async function generateWithDeepSeek(prompt: string, systemPrompt: string): Promise<string | null> {
    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekKey) {
        console.log("[DEEPSEEK] No API key found, skipping...");
        return null;
    }
    
    try {
        const response = await fetch(
            'https://api.deepseek.com/v1/chat/completions',
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${deepseekKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.8,
                    max_tokens: 4000,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[DEEPSEEK_API_ERROR]", errorText);
            return null;
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
    } catch (error) {
        console.error("[DEEPSEEK_GENERATION_FAILED]", error);
        return null;
    }
}

// Google Gemini API call (FALLBACK)
async function generateWithGemini(prompt: string, systemPrompt: string): Promise<string | null> {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) return null;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: systemPrompt },
                            { text: prompt }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 4000,
                    }
                }),
            }
        );

        if (!response.ok) {
            console.error("[GEMINI_API_ERROR]", await response.text());
            return null;
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error("[GEMINI_GENERATION_FAILED]", error);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        let { userId } = await auth(req as any);
        
        let body: any;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "INVALID_JSON", message: "The request format was incorrect." }, { status: 400 });
        }
        
        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED", message: "Please sign in to continue." }, { status: 401 });
        }

        const userRecord = await currentUser();
        const email = userRecord?.emailAddresses[0]?.emailAddress || `user_${userId}@internal.db`;

        let user: { id: string, email: string, tier: string, shortCredits: number, mediumCredits: number };
        try {
            const dbUser = await db.user.findUnique({ where: { id: userId! } });
            if (!dbUser) {
                console.log(`[SYNC] Creating new user profile for ${userId}`);
                user = await db.user.create({
                    data: {
                        id: userId!,
                        email: email,
                        tier: "free",
                        shortCredits: 3,
                        mediumCredits: 2
                    }
                });
            } else {
                user = dbUser;
            }
        } catch (dbError) {
            console.error("[DATABASE_SYNC_ERROR]", dbError);
            user = {
                id: userId!,
                email: email,
                tier: "free",
                shortCredits: 3,
                mediumCredits: 2
            };
            console.log("[DB_FALLBACK] Using free tier for user.");
        }

        const { prompt, apiKey, productName, features, tone, length, profession, customKeywords, brandVoice, platform, language } = body as {
            prompt?: string;
            apiKey?: string;
            productName?: string;
            features?: string;
            tone?: string;
            length?: string;
            profession?: string;
            customKeywords?: string;
            brandVoice?: string;
            platform?: string;
            language?: string;
        };

        const isAgency = user.tier === "agency";
        const isPremium = user.tier === "pro" || isAgency;
        
        if (customKeywords && !isPremium) {
            return NextResponse.json(
                { error: "UPGRADE_REQUIRED", message: "Custom SEO Keywords require Pro or Agency tier. Upgrade to unlock this feature." },
                { status: 403 }
            );
        }
        
        if (brandVoice && !isPremium) {
            return NextResponse.json(
                { error: "UPGRADE_REQUIRED", message: "Brand Voice Presets require Pro or Agency tier. Upgrade to unlock this feature." },
                { status: 403 }
            );
        }

        // --- CREDIT DEDUCTION FOR FREE TIER ---
        const selectedLength = length || 'medium';
        const isShortLength = ['micro', 'tiny', 'mini', 'short', 'twitter', 'tiktok'].includes(selectedLength);
        const isMediumLength = ['medium', 'facebook', 'linkedin'].includes(selectedLength);
        
        if (user.tier === "free") {
            if (isShortLength && user.shortCredits <= 0) {
                return NextResponse.json({
                    error: "CREDITS_EXHAUSTED",
                    message: "You've used all your short-form credits. Upgrade to Pro for unlimited generations!",
                    upgradeUrl: "/pricing"
                }, { status: 403 });
            }
            if (isMediumLength && user.mediumCredits <= 0) {
                return NextResponse.json({
                    error: "CREDITS_EXHAUSTED",
                    message: "You've used all your medium-form credits. Upgrade to Pro for unlimited generations!",
                    upgradeUrl: "/pricing"
                }, { status: 403 });
            }
        }

        // --- CHECK CACHE FIRST (Reduce API calls) ---
        if (productName) {
            const cacheKey = `${productName}_${platform || 'amazon'}_${tone || 'professional'}_${length || 'medium'}`;
            try {
                const cached = await db.descriptionCache.findUnique({
                    where: {
                        cacheKey,
                        expiresAt: { gt: new Date() }
                    }
                });
                
                if (cached) {
                    console.log(`[CACHE] HIT for ${cacheKey} (provider: ${cached.provider})`);
                    return NextResponse.json({
                        generated_text: cached.description,
                        provider: cached.provider,
                        fromCache: true,
                        cachedAt: cached.createdAt
                    });
                }
            } catch (cacheError) {
                console.warn("[CACHE] Error checking cache:", cacheError);
            }
        }

        // --- AGENCY ENHANCEMENT ---
        const agencyInstructions: string[] = [];
        if (isAgency) {
            if (customKeywords) {
                agencyInstructions.push(`CRITICAL SEO: You MUST naturally incorporate these keywords multiple times: ${customKeywords}.`);
            }
            if (brandVoice) {
                agencyInstructions.push(`BRAND VOICE: Strictly adopt the style of ${brandVoice}.`);
            }
        }

        const tierComplexityInstructions = isPremium
            ? "PREMIUM CONTENT STRATEGY: Use professional marketing frameworks like AIDA or PAS. Incorporate high-conversion psychological triggers. Sophisticated writing, search dominance."
            : "STANDARD CONTENT STRATEGY: Use clear, benefit-driven language. Professional descriptions.";

        // --- GENERATION LIMIT ENFORCEMENT ---
        const now = new Date();
        const userAny = user as any;
        const lastReset = userAny.lastMonthReset ? new Date(userAny.lastMonthReset) : now;
        const isNewMonth = lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear();
        
        if (isNewMonth) {
            try {
                await db.user.update({
                    where: { id: user.id },
                    data: {
                        generationsThisMonth: 0,
                        lastMonthReset: now
                    } as any
                });
                console.log(`[MONTHLY_RESET] Reset counter for ${user.email}`);
            } catch (resetError) {
                console.warn("[MONTHLY_RESET] Failed to reset:", resetError);
            }
        }
        
        const currentCount = userAny.generationsThisMonth || 0;
        const tierLimits: Record<string, number> = {
            free: 5,
            pro: 100,
            agency: 1000
        };
        
        const limit = tierLimits[user.tier] || 5;
        
        if (currentCount >= limit) {
            return NextResponse.json({
                error: "MONTHLY_LIMIT_REACHED",
                message: `You've reached your monthly limit of ${limit} generations. Upgrade to increase your limit.`,
                currentUsage: currentCount,
                limit: limit,
                upgradeUrl: "/pricing"
            }, { status: 429 });
        }
        
        console.log(`[USER] ${user.email} (${user.tier}) - ${currentCount + 1}/${limit} generations this month`);

        const finalApiKey = (apiKey && apiKey.startsWith("gsk_")) ? apiKey : process.env.GROQ_API_KEY;

        const syncInsights = await findSyncInsights(productName || features || "");
        const intelContext = syncInsights.length > 0
            ? `KNOWLEDGE_VAULT_INSIGHTS:\n${syncInsights.map((insight: { content: string }) => `- ${insight.content}`).join("\n")}`
            : "";

        const socialKitRequirement = isPremium
            ? `5. FOR EACH VARIANT, you MUST include a "Social Media Kit" section with these EXACT headings and UNIQUE content for each platform:
               INSTAGRAM Caption: (Visual-focused, 2-3 sentences, 5-7 hashtags, emojis, engaging and lifestyle-oriented)
               TWITTER Post: (Short, punchy, under 280 chars, 2-3 hashtags, hook-driven, conversation starter)
               FACEBOOK Post: (Longer form, 3-4 sentences, storytelling angle, 3-5 hashtags, community-focused)
               CRITICAL: Each platform post must be COMPLETELY DIFFERENT from the product description and from each other. Do NOT copy-paste the same content.`
            : `5. Do NOT include a "Social Kit". Focus ONLY on the product description.`;

        const platformInstructions: Record<string, string> = {
            amazon: `AMAZON OPTIMIZED:
- SEO-heavy with backend search terms
- 5 bullet points (max 500 chars each)
- Focus on keywords, features, benefits
- Include dimensions, materials, care instructions
- Competitive comparison angle`,
            shopify: `SHOPIFY OPTIMIZED:
- Brand storytelling approach
- Emotional connection with customer
- Lifestyle benefits over technical specs
- Include brand mission/values if relevant
- Meta description friendly (150-160 chars)`,
            etsy: `ETSY OPTIMIZED:
- Handmade/craft emotional appeal
- Personal story of creation
- Materials sourcing transparency
- Perfect for gifting angle
- Tags-friendly keywords (13 tags max)`,
            ebay: `EBAY OPTIMIZED:
- Direct, feature-focused listing
- Item specifics emphasis
- Condition details prominently
- Shipping/return policy mention
- Competitive pricing justification`,
            tiktok: `TIKTOK VIRAL OPTIMIZED:
- HOOK in first 3 seconds (visual + text)
- Trending sound/caption style
- Short, punchy, energetic
- Hashtag strategy (3-5 trending tags)
- Call-to-action: "Link in bio" or "Shop now"
- Emoji-heavy, Gen-Z friendly language`,
            linkedin: `LINKEDIN PROFESSIONAL OPTIMIZED:
- B2B authority positioning
- Thought leadership angle
- Problem-solution framework
- Data/statistics backed claims
- Professional tone (no emojis)
- CTA: "Comment your thoughts" or "DM for details"
- Hashtags: 3-5 industry-specific`,
            facebook: `FACEBOOK ENGAGEMENT OPTIMIZED:
- Community-focused storytelling
- Question-based hooks for comments
- Shareable emotional content
- Local/group angle if applicable
- 3-5 hashtags, mix of broad and niche
- CTA: "Tag a friend" or "Share if you agree"`,
            twitter: `TWITTER/X OPTIMIZED:
- Under 280 characters (strict limit)
- Punchy hook in first 5 words
- 2-3 hashtags max (trending + niche)
- Thread potential (1/3, 2/3, 3/3 style)
- Conversation starter question
- CTA: "Retweet if you agree" or "Reply with your thoughts"`
        };

        const selectedPlatform = platform || 'amazon';
        const platformPrompt = platformInstructions[selectedPlatform] || platformInstructions.amazon;

        const lengthConfig: Record<string, { words: number; desc: string }> = {
            micro: { words: 50, desc: "MICRO (50 words max) - Ultra-concise for ads & headlines" },
            tiny: { words: 100, desc: "TINY (100 words max) - Quick scan-friendly descriptions" },
            mini: { words: 150, desc: "MINI (150 words max) - Short & sweet for mobile" },
            short: { words: 120, desc: "SHORT & PUNCHY (120 words max) - Perfect for mobile shoppers who scan in 5 seconds" },
            medium: { words: 250, desc: "BALANCED & ENGAGING (250 words max) - Sweet spot for conversion + SEO" },
            long: { words: 500, desc: "COMPREHENSIVE & PERSUASIVE (500 words max) - Full storytelling for high-ticket items" },
            tiktok: { words: 80, desc: "TIKTOK VIRAL (80 words max) - Hook in 3 seconds, trending style" },
            twitter: { words: 100, desc: "TWITTER PUNCHY (100 words max) - Short, viral, under 280 chars" },
            linkedin: { words: 300, desc: "LINKEDIN PROFESSIONAL (300 words max) - B2B authority, thought leadership" },
            facebook: { words: 150, desc: "FACEBOOK ENGAGING (150 words max) - Community-focused, shareable" }
        };

        const selectedLengthObj = lengthConfig[length || 'medium'] || lengthConfig.medium;

        const lengthToTokens: Record<string, number> = {
            micro: 150,
            tiny: 250,
            mini: 350,
            short: 300,
            medium: 500,
            long: 1000,
            tiktok: 200,
            twitter: 250,
            linkedin: 600,
            facebook: 350
        };
        const maxTokensForLength = lengthToTokens[length || 'medium'] || 500;

        const supportedLanguages: Record<string, string> = {
            english: "You are a native English speaker. Write all content in English with perfect grammar.",
            spanish: "ESCRIBE TODAS LAS DESCIPCIONES EN ESPAÑOL. Usa un tono profesional y natural. Incluye caracteres españoles (ñ, á, é, í, ó, ú, ü) cuando sea necesario.",
            french: "ÉCRIS TOUTES LES DESCRIPTIONS EN FRANÇAIS. Utilise un ton professionnel et naturel. Inclue les accents français (é, è, ê, ë, à, â, ô, û, ç) quand nécessaire.",
            german: "SCHREIBE ALLE BESCHREIBUNGEN AUF DEUTSCH. Verwende einen professionellen und natürlichen Ton. Verwende deutsche Umlaute (ä, ö, ü, ß) wenn nötig.",
            italian: "SCRIVI TUTTE LE DESCRIZIONI IN ITALIANO. Usa un tono professionale e naturale. Includi gli accenti italiani (à, è, é, ì, ò, ù) quando necessario.",
            portuguese: "ESCREVA TODAS AS DESCRIÇÕES EM PORTUGUÊS. Use um tom profissional e natural. Inclua acentos portugueses (ã, õ, ç, é, è, ê, ó, ò, ô) quando necessário.",
            dutch: "SCHRIJF ALLE BESCHRIJVINGEN IN HET NEDERLANDS. Gebruik een professionele en natuurlijke toon.",
            polish: "NAPIWSZ WSZYSTKIE OPISY PO POLSKU. Użyj profesjonalnego i naturalnego tonu. Uwzględnij polskie znaki (ą, ę, ó, ł, ń, ś, ź, ż) gdy to konieczne.",
            russian: "ПИШИТЕ ВСЕ ОПИСАНИЯ НА РУССКОМ ЯЗЫКЕ. Используйте профессиональный и естественный тон. Включите русские символы (а, е, и, о, у, ы, э, ю, я) где необходимо.",
            japanese: "すべての説明を日本語で書いてください。professionalで自然なtoneを使ってください。",
            chinese: "请用中文写所有产品描述。使用专业且自然的语气。",
            korean: "모든 제품 설명을 한국어로 작성해 주세요. 전문적이고 자연스러운 어조를 사용하세요.",
            arabic: "اكتب جميع الأوصاف بالعربية. استخدم نبرة مهنية وطبيعية.",
            hindi: "सभी विवरण हिंदी में लिखें। एक पेशेवर और प्राकृतिक स्वर का उपयोग करें।",
            turkish: "TÜM AÇIKLAMALARI TÜRKÇE YAZIN. Profesyonel ve doğal bir ton kullanın.",
            vietnamese: "VIẾT TẤT CẢ CÁC MÔ TẢ BẰNG TIẾNG VIỆT. Sử dụng giọng điệu chuyên nghiệp và tự nhiên.",
            thai: "เขียนคำอธิบายทั้งหมดเป็นภาษาไทย ใช้น้ำเสียงที่เป็นมืออาชีพและเป็นธรรมชาติ",
            indonesian: "TULIS SEMUA DESKRIPSI DALAM BAHASA INDONESIA. Gunakan nada profesional dan alami.",
            malay: "TULIS SEMUA PERIHALAN DALAM BAHASA MELAYU. Gunakan nada profesional dan semulajadi.",
            greek: "ΓΡΑΨΕ ΟΛΕΣ ΤΙΣ ΠΕΡΙΓΡΑΦΕΣ ΣΤΑ ΕΛΛΗΝΙΚΑ. Χρησιμοποίησε επαγγελματικό και φυσικό τόνο.",
            hebrew: "כתוב את כל התיאורים בעברית. השתמש בטון מקצועי וטבעי.",
            swedish: "SKRIV ALLA BESKRIVNINGAR PÅ SVENSKA. Använd en professionell och naturlig ton.",
            norwegian: "SKRIV ALLE BESKRIVELSER PÅ NORSK. Bruk en profesjonell og naturlig tone.",
            danish: "SKRIV ALLE BESKRIVELSER PÅ DANSK. Brug en professionel og naturlig tone.",
            finnish: "KIRJOITA KAIKKI KUVAUKSET SUOMEKSI. Käytä ammattimaista ja luonnollista sävyä.",
            czech: "NAPIŠTE VŠECHNY POPISY V ČEŠTINĚ. Použijte profesionální a přirozený tón."
        };
        
        const selectedLanguage = (language && supportedLanguages[language.toLowerCase()]) ? language.toLowerCase() : 'english';
        const languageInstructions = supportedLanguages[selectedLanguage];
        
        const canUseMultiLanguage = isPremium;
        const isBasicLanguage = ['english', 'spanish', 'french'].includes(selectedLanguage);
        
        if (!canUseMultiLanguage && !isBasicLanguage) {
            return NextResponse.json(
                { error: "UPGRADE_REQUIRED", message: "Multi-language support (25+ languages) requires Pro or Agency tier. Upgrade to unlock this feature." },
                { status: 403 }
            );
        }
        
        const agencyBlock = agencyInstructions.length > 0
            ? `AGENCY INSTRUCTIONS:\n${agencyInstructions.join("\n")}\n`
            : "";

        const systemPrompt = `You are an ELITE ${profession || 'Co-founder'} and Conversion Copywriter who writes product descriptions that SELL like crazy on ${selectedPlatform.toUpperCase()}.
${languageInstructions}
${intelContext}
${isPremium ? `SECRET SAUCE: ${getRandomPremiumSecret().instructions}` : ""}

${platformPrompt}

${agencyBlock}
${tierComplexityInstructions}

CRITICAL LENGTH REQUIREMENT: ${selectedLengthObj.desc}
- Word count MUST be ${selectedLengthObj.words} words or less (strict limit)
- Every single word must EARN its place - no fluff, no filler

OUT-OF-THE-BOX COPYWRITING RULES:
1. Write EXACTLY 3 KILLER variants that make buyers STOP scrolling and CLICK "Add to Cart":
   - Variant 1 (EMOTIONAL): Hook with desire/pain point to Paint the dream outcome to Urgency CTA
   - Variant 2 (TECHNICAL): Lead with specs to Prove quality to Logical justification CTA  
   - Variant 3 (URGENT): Scarcity hook to Social proof to FOMO-driven CTA

2. STRUCTURE FOR MAXIMUM CONVERSION:
   - HEADLINE: 5-8 words that GRAB attention (use power words: Exclusive, Proven, Instant, Guaranteed)
   - OPENING HOOK: 1-2 sentences that speak directly to buyer's desire or pain point
   - BENEFIT BULLETS: 3-5 bullets (each starts with BENEFIT, then explains feature)
     * Example: "Sleep deeper every night" (benefit) + "Memory foam adapts to your body" (feature)
   - SOCIAL PROOF LINE: Mention popularity, reviews, or trust signal
   - URGENCY CLOSE: 1 strong CTA with scarcity or time-bound offer

3. COPYWRITING PSYCHOLOGY TO USE:
   - AIDA: Attention to Interest to Desire to Action
   - PAS: Problem to Agitate to Solution
   - Future Pacing: "Imagine waking up to..."
   - Loss Aversion: "Don't miss out on..."
   - Bandwagon Effect: "Join 50,000+ happy customers"

4. POWER WORDS TO SPRINKLE (naturally):
   Exclusive, Proven, Guaranteed, Instant, Premium, Limited, Secret, Revolutionary, Breakthrough, Effortless, Transform, Discover, Unlock, Master, Elite

5. PLATFORM-SPECIFIC MAGIC:
   - Amazon: Focus on search keywords, 5 bullet points, competitive edge
   - Shopify: Brand story, lifestyle benefits, emotional connection
   - Etsy: Handmade charm, personal touch, gifting angle, creator story
   - eBay: Direct benefits, item specifics, deal urgency

6. FORBIDDEN (kills conversions):
   - Generic phrases like "high quality" or "best product"
   - Feature dumps without benefits
   - Passive voice
   - More than ${selectedLengthObj.words} words

${socialKitRequirement}

SEPARATE EACH VARIANT with "[[NEXT_VARIANT]]"

REMEMBER: You're not writing a description - you're writing a SALES MACHINE that happens to look like a description. Make every word pull its weight!`;

        const userPrompt = prompt || `Generate 3 descriptions for ${productName}: ${features}`;

        let generatedText = "";
        let usedProvider = "";

        console.log("[AI_PROVIDER] Attempting DeepSeek (Primary)...");
        
        const deepSeekTimeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 8000)
        );
        
        try {
            const deepSeekText = await Promise.race([
                generateWithDeepSeek(userPrompt, systemPrompt),
                deepSeekTimeout
            ]) as string | null;
            
            if (deepSeekText) {
                generatedText = deepSeekText;
                usedProvider = "deepseek";
                console.log("[AI_PROVIDER] Using DeepSeek (Primary)");
            } else {
                throw new Error("DeepSeek returned empty");
            }
        } catch (deepSeekError) {
            console.warn("[DEEPSEEK_FAILED] Trying Groq...", deepSeekError);
            
            try {
                const groqTimeout = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("Timeout")), 8000)
                );
                
                const groqResponse = await Promise.race([
                    fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${finalApiKey}` },
                        body: JSON.stringify({
                            model: "llama-3.1-70b-versatile",
                            messages: [
                                { role: "system", content: systemPrompt },
                                { role: "user", content: userPrompt }
                            ],
                            temperature: 0.8,
                            max_tokens: 4000,
                        }),
                    }),
                    groqTimeout
                ]) as Response;

                if (groqResponse.ok) {
                    const json = await groqResponse.json();
                    generatedText = json.choices?.[0]?.message?.content || "";
                    usedProvider = "groq";
                    console.log("[AI_PROVIDER] Using Groq (Fallback 1)");
                } else {
                    throw new Error("Groq API Failed");
                }
            } catch (groqError) {
                console.error("[GROQ_FAILED]", groqError);
                
                console.log("[AI_PROVIDER] Trying Gemini...");
                try {
                    const geminiTimeout = new Promise((_, reject) => 
                        setTimeout(() => reject(new Error("Timeout")), 5000)
                    );
                    const geminiText = await Promise.race([
                        generateWithGemini(userPrompt, systemPrompt),
                        geminiTimeout
                    ]) as string | null;
                    
                    if (geminiText) {
                        generatedText = geminiText;
                        usedProvider = "gemini";
                        console.log("[AI_PROVIDER] Using Gemini (Fallback 2)");
                    } else {
                        throw new Error("All AI failed");
                    }
                } catch {
                    generatedText = getStaticFallback(productName || "Product", features || "").join("\n\n");
                    usedProvider = "template";
                    console.log("[AI_PROVIDER] Using Template (Instant Fallback)");
                }
            }
        }

        let enhancedResult = { content: generatedText, enhanced: false, source: "AI only" };
        
        const enhancedText = enhancedResult.content;

        if (enhancedResult.content) {
            try {
                const variantsArray = enhancedResult.content.split("[[NEXT_VARIANT]]").map((v: string) => v.trim());

                await db.generation.create({
                    data: {
                        userId: user.id,
                        productName: productName || "Result",
                        features: features || "",
                        tone: tone || "Professional",
                        variants: JSON.stringify(variantsArray)
                    }
                });
            } catch { /* Silent fail for history save */ }
            
            try {
                await db.user.update({
                    where: { id: user.id },
                    data: {
                        generationsThisMonth: { increment: 1 }
                    }
                });
                console.log(`[COUNTER] Incremented generation count for ${user.email}`);
            } catch (counterError) {
                console.warn("[COUNTER] Failed to increment:", counterError);
            }
            
            if (productName) {
                try {
                    const cacheKey = `${productName}_${platform || 'amazon'}_${tone || 'professional'}_${length || 'medium'}`;
                    const expiresAt = new Date();
                    expiresAt.setDate(expiresAt.getDate() + 7);
                    
                    await db.descriptionCache.upsert({
                        where: { cacheKey },
                        update: {
                            description: enhancedResult.content,
                            provider: usedProvider,
                            expiresAt: expiresAt,
                            productName: productName,
                            platform: platform || 'amazon',
                            tone: tone || 'professional'
                        },
                        create: {
                            cacheKey,
                            productName: productName,
                            platform: platform || 'amazon',
                            tone: tone || 'professional',
                            description: enhancedResult.content,
                            provider: usedProvider,
                            expiresAt: expiresAt
                        }
                    });
                    console.log(`[CACHE] SAVED for ${cacheKey} (provider: ${usedProvider})`);
                } catch (cacheError) {
                    console.warn("[CACHE] Failed to save cache:", cacheError);
                }
            }

            // --- DEDUCT CREDITS FOR FREE TIER ---
            if (user.tier === "free") {
                try {
                    if (isShortLength) {
                        await db.user.update({
                            where: { id: user.id },
                            data: { shortCredits: { decrement: 1 } }
                        });
                        console.log(`[CREDIT] Deducted 1 short credit for ${user.email}`);
                    } else if (isMediumLength) {
                        await db.user.update({
                            where: { id: user.id },
                            data: { mediumCredits: { decrement: 1 } }
                        });
                        console.log(`[CREDIT] Deducted 1 medium credit for ${user.email}`);
                    }
                } catch (creditError) {
                    console.warn("[CREDIT] Failed to deduct credit:", creditError);
                }
            }
        }

        return NextResponse.json({ 
            generated_text: enhancedResult.content,
            provider: usedProvider,
            enhanced: enhancedResult.enhanced,
            source: enhancedResult.source
        });

    } catch (genError) {
        console.error("[GENERATION_FAILED]", genError);

        const body = await req.json().catch(() => ({}));
        const { productName, features } = body;
        
        const liveInspiration = await crawlMarketingInspiration(productName, features);
        if (liveInspiration && Array.isArray(liveInspiration)) {
            return NextResponse.json({
                generated_text: liveInspiration.join("[[NEXT_VARIANT]]"),
                is_live_fallback: true,
                message: "Fetched live inspiration."
            });
        }

        const staticVariants = getStaticFallback(productName, features);
        return NextResponse.json({
            generated_text: staticVariants.join("[[NEXT_VARIANT]]"),
            is_static_fallback: true
        });
    }
}
