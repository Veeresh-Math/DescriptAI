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
                        mediumCredits: 2
                    }
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
                referralCode: `dai_${userId.slice(-6)}`
            };
            console.log("[TESTING_MODE] Database unreachable, granting temporary Agency access.");
        }

        interface UserWithReferral {
            id: string;
            email: string;
            tier: string;
            shortCredits: number;
            mediumCredits: number;
            referralCode?: string;
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            tier: user.tier,
            shortCredits: user.shortCredits,
            mediumCredits: user.mediumCredits,
            referralCode: (user as UserWithReferral).referralCode
        });

    } catch (error: unknown) {
        console.error("[USER_GET_FATAL]", error);
        return NextResponse.json({
            error: "SERVER_ERROR",
            message: "A fatal error occurred. Our team has been notified!"
        }, { status: 500 });
    }
}
