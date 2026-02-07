import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        console.log("[HISTORY_POST] Auth userId:", userId);
        if (!userId) {
            console.log("[HISTORY_POST] ERROR: No userId");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { productName, features, tone, variants, imageUrls } = body;
        console.log("[HISTORY_POST] Saving generation:", { productName, tone, variantsCount: variants?.length });

        const generation = await db.generation.create({

            data: {
                userId,
                productName,
                features,
                tone,
                variants: JSON.stringify(variants), // Serialize for SQLite
                imageUrls: imageUrls ? JSON.stringify(imageUrls) : null,
            },
        });

        console.log("[HISTORY_POST] SUCCESS: Saved generation ID:", generation.id);
        return NextResponse.json(generation);
    } catch (error) {
        console.error("[HISTORY_POST] ERROR:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function GET(_req: Request) {
    try {
        const { userId } = await auth();
        console.log("[HISTORY_GET] Auth userId:", userId);
        if (!userId) {
            console.log("[HISTORY_GET] ERROR: No userId");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("[HISTORY_GET] Querying database for user:", userId);
        const history = await db.generation.findMany({

            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log("[HISTORY_GET] Found", history.length, "records");

        // Parse JSON variants and imageUrls back to array
        const parsedHistory = history.map((item) => ({
            ...item,
            variants: JSON.parse(item.variants),
            imageUrls: item.imageUrls ? JSON.parse(item.imageUrls) : [],
        }));

        console.log("[HISTORY_GET] SUCCESS: Returning", parsedHistory.length, "items");
        return NextResponse.json(parsedHistory);
    } catch (error) {
        console.error("[HISTORY_GET] ERROR:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
