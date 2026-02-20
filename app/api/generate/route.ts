import { NextResponse } from "next/server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getRandomPremiumSecret } from "@/lib/knowledge-vault";
import { getStaticFallback } from "@/lib/resource-fallback";
import { crawlMarketingInspiration, enhanceWithRealData } from "@/lib/web-crawler";

import { findSyncInsights } from "@/lib/intelligence-sync";

export const dynamic = "force-dynamic";

// DeepSeek API call (PRIMARY - FREE)
async function generateWithDeepSeek(prompt: string, systemPrompt: string): Promise<string | null> {
    try {
        const response = await fetch(
            'https://api.deepseek.com/v1/chat/completions',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 2048,
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
                        temperature: 0.7,
                        maxOutputTokens: 2048,
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
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED", message: "Please sign in to continue." }, { status: 401 });
        }

        const userRecord = await currentUser();
        const email = userRecord?.emailAddresses[0]?.emailAddress || `user_${userId}@internal.db`;

        // Sync User with DB (Protected by try-catch with fallback)
        let user: { id: string, email: string, tier: string, shortCredits: number, mediumCredits: number };
        try {
            const dbUser = await db.user.findUnique({ where: { id: userId } });
            if (!dbUser) {
                console.log(`[SYNC] Creating new user profile for ${userId}`);
                user = await db.user.create({
                    data: {
                        id: userId,
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
                id: userId,
                email: email,
                tier: "agency",
                shortCredits: 999,
                mediumCredits: 999
            };
            console.log("[TESTING_MODE] Database unreachable, granting temporary Agency access.");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let body: any;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "INVALID_JSON", message: "The request format was incorrect." }, { status: 400 });
        }

        const { prompt, apiKey, productName, features, tone, length, profession, customKeywords, brandVoice, platform } = body as {
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
        };

        // --- CHECK CACHE FIRST (Reduce API calls) ---
        if (productName) {
            const cacheKey = `${productName}_${platform || 'amazon'}_${tone || 'professional'}_${length || 'medium'}`;
            try {
                const cached = await db.descriptionCache.findUnique({
                    where: {
                        cacheKey,
                        expiresAt: { gt: new Date() } // Only use if not expired
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
                // Continue without cache
            }
        }



        // --- AGENCY ENHANCEMENT ---
        const _agencyInstructions: string[] = [];

        if (user.tier === "agency" || user.tier === "pro") {
            if (customKeywords) {
                _agencyInstructions.push(`\n - CRITICAL SEO: You MUST naturally incorporate these keywords multiple times: ${customKeywords}.`);
            }
            if (brandVoice) {
                _agencyInstructions.push(`\n - BRAND VOICE: Strictly adopt the style of ${brandVoice}.`);
            }
        }




        // --- GENERATION LIMIT ENFORCEMENT ---
        // Check and reset monthly counter if needed
        const now = new Date();
        const lastReset = user.lastMonthReset ? new Date(user.lastMonthReset) : now;
        const isNewMonth = lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear();
        
        if (isNewMonth) {
            // Reset monthly counter
            try {
                await db.user.update({
                    where: { id: user.id },
                    data: {
                        generationsThisMonth: 0,
                        lastMonthReset: now
                    }
                });
                console.log(`[MONTHLY_RESET] Reset counter for ${user.email}`);
            } catch (resetError) {
                console.warn("[MONTHLY_RESET] Failed to reset:", resetError);
            }
        }
        
        // Check generation limits based on tier
        const currentCount = user.generationsThisMonth || 0;
        const tierLimits: Record<string, number> = {
            free: 5,      // 5 generations/month
            pro: 100,     // 100 generations/month
            agency: 1000  // 1000 generations/month (effectively unlimited)
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



        // Note: DeepSeek doesn't require API key (currently free)
        // Groq fallback uses GROQ_API_KEY from env (optional)
        const finalApiKey = (apiKey && apiKey.startsWith("gsk_")) ? apiKey : process.env.GROQ_API_KEY;
        // No error if no API key - DeepSeek will be used as primary

        // --- CONTENT QUALITY TIERING ---
        const isPremiumTier = user.tier === "pro" || user.tier === "agency";
        const _tierComplexityInstructions = isPremiumTier
            ? "6. PREMIUM CONTENT STRATEGY: Use professional marketing frameworks like AIDA or PAS. Incorporate high-conversion psychological triggers. sophisticated writing, search dominance."
            : "6. STANDARD CONTENT STRATEGY: Use clear, benefit-driven language. Professional descriptions.";
        void _tierComplexityInstructions;




        // --- PROACTIVE INTELLIGENCE SYNC ---
        const syncInsights = await findSyncInsights(productName || features || "");
        interface SyncInsight {
            content: string;
        }
        const intelContext = syncInsights.length > 0
            ? `\nKNOWLEDGE_VAULT_INSIGHTS:\n${syncInsights.map((insight: { content: string }) => `- ${insight.content}`).join("\n")}`
            : "";





        const socialKitRequirement = isPremiumTier
            ? `5. FOR EACH VARIANT, you MUST include a "Social Media Kit" section with these EXACT headings and UNIQUE content for each platform:
               📸 Instagram Caption: (Visual-focused, 2-3 sentences, 5-7 hashtags, emojis, engaging and lifestyle-oriented)
               🐦 Twitter Post: (Short, punchy, under 280 chars, 2-3 hashtags, hook-driven, conversation starter)
               📘 Facebook Post: (Longer form, 3-4 sentences, storytelling angle, 3-5 hashtags, community-focused)
               
               CRITICAL: Each platform post must be COMPLETELY DIFFERENT from the product description and from each other. Do NOT copy-paste the same content.`
            : `5. Do NOT include a "Social Kit". Focus ONLY on the product description.`;

        // --- PLATFORM-SPECIFIC INSTRUCTIONS ---
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

        // --- LENGTH CONFIGURATION ---
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



        const selectedLength = lengthConfig[length || 'medium'] || lengthConfig.medium;


        // --- SYSTEM PROMPT ---
        const systemPrompt = `You are an ELITE ${profession || 'Co-founder'} and Conversion Copywriter who writes product descriptions that SELL like crazy on ${selectedPlatform.toUpperCase()}.
${intelContext}
${isPremiumTier ? `SECRET SAUCE: ${getRandomPremiumSecret().instructions}` : ""}

${platformPrompt}

🎯 CRITICAL LENGTH REQUIREMENT: ${selectedLength.desc}
- Word count MUST be ${selectedLength.words} words or less (strict limit)
- Every single word must EARN its place - no fluff, no filler

🔥 OUT-OF-THE-BOX COPYWRITING RULES:
1. Write EXACTLY 3 KILLER variants that make buyers STOP scrolling and CLICK "Add to Cart":
   - Variant 1 (EMOTIONAL): Hook with desire/pain point → Paint the dream outcome → Urgency CTA
   - Variant 2 (TECHNICAL): Lead with specs → Prove quality → Logical justification CTA  
   - Variant 3 (URGENT): Scarcity hook → Social proof → FOMO-driven CTA

2. STRUCTURE FOR MAXIMUM CONVERSION:
   - HEADLINE: 5-8 words that GRAB attention (use power words: Exclusive, Proven, Instant, Guaranteed)
   - OPENING HOOK: 1-2 sentences that speak directly to buyer's desire or pain point
   - BENEFIT BULLETS: 3-5 bullets (each starts with BENEFIT, then explains feature)
     * Example: "Sleep deeper every night" (benefit) + "Memory foam adapts to your body" (feature)
   - SOCIAL PROOF LINE: Mention popularity, reviews, or trust signal
   - URGENCY CLOSE: 1 strong CTA with scarcity or time-bound offer

3. COPYWRITING PSYCHOLOGY TO USE:
   - AIDA: Attention → Interest → Desire → Action
   - PAS: Problem → Agitate → Solution
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
   - More than ${selectedLength.words} words

${socialKitRequirement}

✅ SEPARATE EACH VARIANT with "[[NEXT_VARIANT]]"

REMEMBER: You're not writing a description - you're writing a SALES MACHINE that happens to look like a description. Make every word pull its weight!`;



        const userPrompt = prompt || `Generate 3 descriptions for ${productName}: ${features}`;

        // --- GENERATION LOGIC ---
        let generatedText = "";
        let usedProvider = "";
        const usedModel = "llama-3.3-70b-versatile";

        // Try DeepSeek first (PRIMARY - FREE)
        console.log("[AI_PROVIDER] Attempting DeepSeek (Primary)...");
        const deepSeekText = await generateWithDeepSeek(userPrompt, systemPrompt);
        
        if (deepSeekText) {
            generatedText = deepSeekText;
            usedProvider = "deepseek";
            console.log("[AI_PROVIDER] Using DeepSeek (Primary)");
        } else {
            console.warn("[DEEPSEEK_FAILED] DeepSeek failed, trying Groq...");
            
            // Fallback to Groq
            try {
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${finalApiKey}` },
                    body: JSON.stringify({
                        model: usedModel,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userPrompt }
                        ],
                        temperature: 0.7,
                    }),
                });

                if (response.ok) {
                    const json = await response.json();
                    generatedText = json.choices?.[0]?.message?.content || "";
                    usedProvider = "groq";
                    console.log("[AI_PROVIDER] Using Groq (Fallback 1)");
                } else {
                    throw new Error("Groq API Failed");
                }
            } catch (groqError) {
                console.error("[GROQ_FAILED]", groqError);
                
                // Fallback to Google Gemini
                console.log("[AI_PROVIDER] Falling back to Google Gemini...");
                const geminiText = await generateWithGemini(userPrompt, systemPrompt);
                
                if (geminiText) {
                    generatedText = geminiText;
                    usedProvider = "gemini";
                    console.log("[AI_PROVIDER] Using Google Gemini (Fallback 2)");
                } else {
                    throw new Error("All AI providers failed");
                }
            }
        }

        // Enhance with real Google data (NEW FEATURE) - TIER AWARE
        let enhancedResult = { content: generatedText, enhanced: false, source: "AI only" };
        if (generatedText && productName) {
            try {
                console.log("[ENHANCE] Mixing AI content with real Google data...");
                enhancedResult = await enhanceWithRealData(generatedText, productName, features || "", user.tier);
                console.log(`[ENHANCE] Source: ${enhancedResult.source}`);
            } catch (enhanceError) {
                console.warn("[ENHANCE] Failed to enhance, using original AI content:", enhanceError);
                enhancedResult = { content: generatedText, enhanced: false, source: "AI only (enhancement failed)" };
            }
        }
        
        const enhancedText = enhancedResult.content;


        // Save History
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
            
            // --- INCREMENT MONTHLY GENERATION COUNT ---
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
            
            // --- SAVE TO CACHE (for future requests) ---
            if (productName) {
                try {
                    const cacheKey = `${productName}_${platform || 'amazon'}_${tone || 'professional'}_${length || 'medium'}`;
                    const expiresAt = new Date();
                    expiresAt.setDate(expiresAt.getDate() + 7); // Cache for 7 days
                    
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


            // No credit deduction - everything is free!

        }

        return NextResponse.json({ 
            generated_text: enhancedResult.content,
            provider: usedProvider,
            enhanced: enhancedResult.enhanced,
            source: enhancedResult.source
        });



    } catch (genError) {
        console.error("[GENERATION_FAILED]", genError);

        // FALLBACK TO CRAWLER OR STATIC
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

