import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";

// Lazy initialization to avoid build-time errors
const getGroq = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is missing");
  }
  return new Groq({ apiKey });
};

export async function POST(req: Request) {

    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Check if user is Agency (Protected by try-catch with fallback for testing)
        let isAgency = false;
        try {
            const user = await db.user.findUnique({ where: { id: userId } });
            isAgency = user?.tier === 'agency';
        } catch (dbError) {
            console.error("[KEYWORDS_DB_FALLBACK]", dbError);
            isAgency = true; // [DEVELOPER UPGRADE] Allow Agency features if DB is down for testing
        }

        if (!isAgency) {
            return NextResponse.json({ error: "Agency tier required" }, { status: 403 });
        }

        const { productName, features } = await req.json();

        if (!productName || !features) {
            return NextResponse.json({ error: "Product name and features are required" }, { status: 400 });
        }

        console.log(`[KEYWORDS] Generating suggestions for ${productName}`);

        const groq = getGroq();
        const completion = await groq.chat.completions.create({

            messages: [
                {
                    role: "system",
                    content: "You are an expert SEO Strategist. Generate a list of 10-12 high-converting, latent semantic, and long-tail SEO keywords based on the product provided. Return ONLY the keywords separated by commas. No intro, no numbering, no fluff."
                },
                {
                    role: "user",
                    content: `Product: ${productName}\nFeatures: ${features}`
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
        });

        const keywords = completion.choices[0]?.message?.content || "";

        return NextResponse.json({ keywords });

    } catch (error: unknown) {
        console.error("[KEYWORDS_ERROR]", error);
        return NextResponse.json({
            error: "SERVER_ERROR",
            message: "Failed to generate keyword suggestions."
        }, { status: 500 });
    }
}
