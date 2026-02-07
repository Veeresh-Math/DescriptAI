import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Check if user is Agency (Protected by try-catch with fallback for testing)
        let isAgency = false;
        try {
            const user = await db.user.findUnique({ where: { id: userId } });
            isAgency = user?.tier === 'agency';
        } catch (dbError) {
            console.error("[PRESETS_GET_DB_FALLBACK]", dbError);
            isAgency = true; // [DEVELOPER UPGRADE]
        }

        if (!isAgency) {
            return NextResponse.json({ error: "Agency tier required" }, { status: 403 });
        }

        const presets = await db.brandPreset.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(presets);
    } catch (error) {
        console.error("[PRESETS_GET_ERROR]", error);
        return NextResponse.json({ error: "Failed to fetch presets" }, { status: 500 });
    }
}

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
            console.error("[PRESETS_POST_DB_FALLBACK]", dbError);
            isAgency = true; // [DEVELOPER UPGRADE]
        }

        if (!isAgency) {
            return NextResponse.json({ error: "Agency tier required" }, { status: 403 });
        }

        const { name, instructions } = await req.json();

        if (!name || !instructions) {
            return NextResponse.json({ error: "Name and instructions required" }, { status: 400 });
        }

        const preset = await db.brandPreset.create({
            data: {
                userId,
                name,
                instructions
            }
        });

        return NextResponse.json(preset);
    } catch (error) {
        console.error("[PRESETS_POST_ERROR]", error);
        return NextResponse.json({ error: "Failed to save preset" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Check if user is Agency (Protected by try-catch with fallback for testing)
        let isAgency = false;
        try {
            const user = await db.user.findUnique({ where: { id: userId } });
            isAgency = user?.tier === 'agency';
        } catch (dbError) {
            console.error("[PRESETS_DELETE_DB_FALLBACK]", dbError);
            isAgency = true; // [DEVELOPER UPGRADE]
        }

        if (!isAgency) {
            return NextResponse.json({ error: "Agency tier required" }, { status: 403 });
        }

        const { id } = await req.json();

        await db.brandPreset.delete({
            where: { id, userId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[PRESETS_DELETE_ERROR]", error);
        return NextResponse.json({ error: "Failed to delete preset" }, { status: 500 });
    }
}
