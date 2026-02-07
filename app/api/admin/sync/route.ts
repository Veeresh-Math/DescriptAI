import { NextResponse } from "next/server";
import { runGlobalIntelligenceSync } from "@/lib/intelligence-sync";
import { auth } from "@clerk/nextjs/server";

export async function GET(_req: Request) {

    try {
        const { userId } = await auth();
        // Simple security: Only allow specific user or check for a secret header
        // For development, we allow the authenticated user to trigger it
        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        console.log(`[ADMIN_SYNC] Triggered by user: ${userId}`);
        const syncCount = await runGlobalIntelligenceSync();

        return NextResponse.json({
            success: true,
            message: `Ingested ${syncCount} elite marketing insights into the Global Intelligence Vault.`,
            syncCount
        });
    } catch (error) {
        console.error("[ADMIN_SYNC_FATAL]", error);
        return NextResponse.json({ error: "SYNC_FAILED", details: String(error) }, { status: 500 });
    }
}
