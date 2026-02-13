import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/presets - Get user's brand voice presets
export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is Agency (Protected by try-catch with fallback for testing)
    let isAgency = false;
    try {
        const user = await db.user.findUnique({ where: { id: userId } });
        isAgency = user?.tier === 'agency';
    } catch (dbError) {
        console.error("[PRESETS_GET_DB_FALLBACK]", dbError);
        isAgency = true; // [DEVELOPER UPGRADE]
    }

    // TEMPORARILY ALLOW FOR ALL TIERS FOR TESTING
    if (!isAgency) {
        // Allow for testing - remove this after testing
        console.log("[TESTING_MODE] Allowing preset access for non-Agency user");
    }

    try {
        const presets = await db.brandPreset.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json({ presets });
    } catch (error) {
        console.error("[PRESETS_GET_ERROR]", error);
        // Return fallback presets when DB is down
        const fallbackPresets = [
            {
                id: "fallback-1",
                name: "🎯 Professional & Authoritative",
                instructions: "Use confident, expert-level language. Focus on authority, trust, and proven results. Avoid casual slang.",
                createdAt: new Date().toISOString()
            },
            {
                id: "fallback-2",
                name: "😄 Friendly & Conversational",
                instructions: "Write like you're talking to a friend. Use casual language, contractions, and relatable examples. Warm and approachable.",
                createdAt: new Date().toISOString()
            },
            {
                id: "fallback-3",
                name: "⚡ Energetic & Enthusiastic",
                instructions: "High energy, exciting, use exclamation points and power words. Create urgency and excitement around the product.",
                createdAt: new Date().toISOString()
            }
        ];
        return NextResponse.json({ presets: fallbackPresets, fallback: true });
    }

}

// POST /api/presets - Create new brand voice preset
export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is Agency (Protected by try-catch with fallback for testing)
    let isAgency = false;
    try {
        const user = await db.user.findUnique({ where: { id: userId } });
        isAgency = user?.tier === 'agency';
    } catch (dbError) {
        console.error("[PRESETS_POST_DB_FALLBACK]", dbError);
        isAgency = true; // [DEVELOPER UPGRADE]
    }

    // TEMPORARILY ALLOW FOR ALL TIERS FOR TESTING
    if (!isAgency) {
        // Allow for testing - remove this after testing
        console.log("[TESTING_MODE] Allowing preset creation for non-Agency user");
    }

    try {
        const { name, instructions } = await req.json();

        const preset = await db.brandPreset.create({
            data: {
                userId,
                name,
                instructions
            }
        });


        return NextResponse.json({ preset });
    } catch (error) {
        console.error("[PRESETS_POST_ERROR]", error);
        return NextResponse.json({ error: "Failed to create preset" }, { status: 500 });
    }
}

// DELETE /api/presets?id=xxx - Delete a preset
export async function DELETE(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Preset ID required" }, { status: 400 });
    }

    // Check if user is Agency (Protected by try-catch with fallback for testing)
    let isAgency = false;
    try {
        const user = await db.user.findUnique({ where: { id: userId } });
        isAgency = user?.tier === 'agency';
    } catch (dbError) {
        console.error("[PRESETS_DELETE_DB_FALLBACK]", dbError);
        isAgency = true; // [DEVELOPER UPGRADE]
    }

    // TEMPORARILY ALLOW FOR ALL TIERS FOR TESTING
    if (!isAgency) {
        // Allow for testing - remove this after testing
        console.log("[TESTING_MODE] Allowing preset deletion for non-Agency user");
    }

    try {
        await db.brandPreset.delete({
            where: { id, userId } // Ensure user can only delete their own presets
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[PRESETS_DELETE_ERROR]", error);
        return NextResponse.json({ error: "Failed to delete preset" }, { status: 500 });
    }
}
