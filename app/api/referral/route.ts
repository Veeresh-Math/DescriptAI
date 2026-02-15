import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

        let user: { id: string, email: string, tier: string, referralCode: string };
        try {
            const dbUser = await db.user.findUnique({ where: { id: userId } });
            if (!dbUser) {
                // Should not happen if sync is working, but fallback for robust API
                return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
            }
            user = dbUser as unknown as { id: string, email: string, tier: string, referralCode: string };
        } catch {

            // Fallback for database connection issues
            return NextResponse.json({
                referralCode: `dai_user_${userId.slice(-6)}`,
                referralCount: 0,
                potentialCredits: 0
            });
        }

        const referrals = await db.referral.findMany({
            where: { referrerId: userId }
        });

        return NextResponse.json({
            referralCode: user.referralCode,
            referralCount: referrals.length,
            rewardedCount: referrals.filter((r: typeof referrals[number]) => r.status === 'rewarded').length,
            potentialCredits: referrals.filter((r: typeof referrals[number]) => r.status === 'pending').length * 5
        });
    } catch (error) {
        console.error("[REFERRAL_ERROR]", error);
        return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
    }
}

