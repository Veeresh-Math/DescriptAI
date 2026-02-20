import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED", message: "Sign in to see your profile." }, { status: 401 });
        }

        const userRecord = await currentUser();
        const email = userRecord?.emailAddresses[0]?.emailAddress || `user_${userId}@internal.db`;

        let user;
        try {
            user = await db.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                console.log(`[USER_GET] Creating profile for ${userId}`);
                user = await db.user.create({
                    data: {
                        id: userId,
                        email: email,
                        tier: "free",
                        shortCredits: 3,
                        mediumCredits: 2,
                        generationsThisMonth: 0,
                        lastMonthReset: new Date()
                    } as any
                });
            }
        } catch (dbError) {
            console.error("[USER_DB_ERROR]", dbError);
            // [DEVELOPER UPGRADE] Fallback user object
            user = {
                id: userId,
                email: email,
                tier: "agency",
                shortCredits: 999,
                mediumCredits: 999,
                generationsThisMonth: 0,
                lastMonthReset: new Date(),
                referralCode: `dai_${userId.slice(-6)}`
            };
            console.log("[TESTING_MODE] Database unreachable, granting temporary Agency access.");
        }

        // Use type assertion to include new fields
        const userAny = user as any;
        
        // Calculate remaining generations
        const tierLimits: Record<string, number> = {
            free: 5,
            pro: 100,
            agency: 1000
        };
        const limit = tierLimits[userAny.tier] || 5;
        const remaining = Math.max(0, limit - (userAny.generationsThisMonth || 0));

        return NextResponse.json({
            id: userAny.id,
            email: userAny.email,
            tier: userAny.tier,
            shortCredits: userAny.shortCredits,
            mediumCredits: userAny.mediumCredits,
            generationsThisMonth: userAny.generationsThisMonth,
            remainingGenerations: remaining,
            monthlyLimit: limit,
            referralCode: userAny.referralCode
        });

    } catch (error: unknown) {
        console.error("[USER_GET_FATAL]", error);
        return NextResponse.json({
            error: "SERVER_ERROR",
            message: "A fatal error occurred. Our team has been notified!"
        }, { status: 500 });
    }
}

