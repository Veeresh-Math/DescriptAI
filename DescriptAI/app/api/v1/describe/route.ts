import { NextResponse } from "next/server";

// Developer API for generating descriptions
// Use: POST /api/v1/describe

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { 
      productName, 
      features, 
      tone = "professional", 
      length = "medium",
      platform = "amazon",
      keywords,
      apiKey 
    } = await req.json();

    // Validate API key
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required. Get one from your dashboard." },
        { status: 401 }
      );
    }

    // In production, validate API key against database
    // For now, accept any key for testing
    if (apiKey.length < 10) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    if (!productName) {
      return NextResponse.json(
        { error: "productName is required" },
        { status: 400 }
      );
    }

    // Build the prompt
    const lengthConfig: Record<string, { words: number; desc: string }> = {
      short: { words: 50, desc: "Short - 50 words or less" },
      medium: { words: 150, desc: "Medium - 150 words" },
      long: { words: 300, desc: "Long - 300 words" }
    };

    const selectedLength = lengthConfig[length] || lengthConfig.medium;

    const prompt = `Generate a ${tone} product description for ${productName}. 
Key features: ${features || "high quality, durable, innovative"}
Platform: ${platform}
Length: ${selectedLength.desc}
${keywords ? `Include these keywords: ${keywords}` : ""}

Generate 3 unique variations:
1. Emotional/Hook - Focus on feelings and desires
2. Technical/Feature-focused - Focus on specs and benefits  
3. Urgent/Conversion - Focus on scarcity and social proof

Format as JSON with keys: emotional, technical, urgent`;

    // Call DeepSeek API
    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    
    let generatedText = "";
    
    if (deepseekKey) {
      try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${deepseekKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'You are an expert e-commerce copywriter. Generate compelling product descriptions.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          generatedText = data.choices?.[0]?.message?.content || "";
        }
      } catch (aiError) {
        console.error("[API_AI_ERROR]", aiError);
      }
    }

    // Fallback if AI fails
    if (!generatedText) {
      generatedText = JSON.stringify({
        emotional: `Experience the magic of ${productName} - crafted to bring joy to your everyday life. Premium quality meets stunning design.`,
        technical: `${productName} - Features include ${features || "premium construction, advanced technology, durable build"}. Perfect for ${platform}.`,
        urgent: `Don't miss out on ${productName}! Join thousands of happy customers. Limited stock available.`
      });
    }

    // Parse if JSON string
    let result;
    try {
      result = JSON.parse(generatedText);
    } catch {
      result = { 
        emotional: generatedText,
        technical: generatedText, 
        urgent: generatedText 
      };
    }

    return NextResponse.json({
      success: true,
      product: productName,
      platform,
      tone,
      length,
      descriptions: result,
      usage: {
        creditsUsed: 1,
        remaining: "Unlimited (API)"
      }
    });

  } catch (error) {
    console.error("[API_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}

// Get API usage
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key required" },
      { status: 401 }
    );
  }

  // Return usage stats (in production, fetch from database)
  return NextResponse.json({
    success: true,
    usage: {
      creditsUsed: 0,
      creditsRemaining: "Unlimited",
      tier: "API"
    },
    rateLimit: {
      requestsPerMinute: 60,
      requestsRemaining: 60
    }
  });
}
