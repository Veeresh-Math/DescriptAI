import { NextResponse } from "next/server";
import { auth, currentUser } from "@/lib/auth-server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Trial configuration
const TRIAL_DAYS = 30;

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED", message: "Sign in to update your profile." }, { status: 401 });
        }

        const body = await req.json();
        const { tier, shortCredits, mediumCredits } = body;

        // Validate tier if provided
        if (tier && !["free", "pro", "agency"].includes(tier)) {
            return NextResponse.json({ error: "INVALID_TIER", message: "Tier must be free, pro, or agency." }, { status: 400 });
        }

        // Build update data
        const updateData: any = {};
        if (tier) updateData.tier = tier;
        if (shortCredits !== undefined) updateData.shortCredits = shortCredits;
        if (mediumCredits !== undefined) updateData.mediumCredits = mediumCredits;

        // Check if user exists, if not create them
        let user = await db.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            // Create user with the provided tier
            user = await db.user.create({
                data: {
                    id: userId,
                    email: `user_${userId}@internal.db`,
                    tier: tier || "free",
                    shortCredits: shortCredits || 3,
                    mediumCredits: mediumCredits || 2
                }
            });
        } else {
            // Update existing user
            user = await db.user.update({
                where: { id: userId },
                data: updateData
            });
        }

        return NextResponse.json({
            success: true,
            id: user.id,
            email: user.email,
            tier: user.tier,
            shortCredits: user.shortCredits,
            mediumCredits: user.mediumCredits
        });

    } catch (error: unknown) {
        console.error("[USER_PATCH_FATAL]", error);
        return NextResponse.json({
            error: "SERVER_ERROR",
            message: "Failed to update profile."
        }, { status: 500 });
    }
}

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
            // Fallback user object when database is unreachable - default to FREE tier
            user = {
                id: userId,
                email: email,
                tier: "free",
                shortCredits: 3,
                mediumCredits: 2,
                generationsThisMonth: 0,
                lastMonthReset: new Date(),
                referralCode: `dai_${userId.slice(-6)}`
            };
            console.log("[DB_FALLBACK] Using free tier for user.");
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
            referralCode: userAny.referralCode,
            // Trial information
            isOnTrial: userAny.isOnTrial || false,
            trialEndDate: userAny.trialEndDate,
            trialDaysRemaining: userAny.isOnTrial && userAny.trialEndDate 
                ? Math.max(0, Math.ceil((new Date(userAny.trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                : 0
        });

    } catch (error: unknown) {
        console.error("[USER_GET_FATAL]", error);
        return NextResponse.json({
            error: "SERVER_ERROR",
            message: "A fatal error occurred. Our team has been notified!"
        }, { status: 500 });
    }
}

// POST endpoint to start free trial
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "UNAUTHORIZED", message: "Sign in to start trial." }, { status: 401 });
        }

        const body = await req.json();
        const { action } = body;

        if (action === 'start_trial') {
            // Check if user already has trial
            const existingUser = await db.user.findUnique({
                where: { id: userId }
            }) as any;

            if (existingUser?.isOnTrial) {
                return NextResponse.json({ error: "ALREADY_TRIAL", message: "Trial already active." }, { status: 400 });
            }

            if (existingUser?.tier === 'pro' || existingUser?.tier === 'agency') {
                return NextResponse.json({ error: "ALREADY_PAID", message: "Already on paid plan." }, { status: 400 });
            }

            // Start trial - give Pro tier access
            const now = new Date();
            const trialEnd = new Date(now.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);

            const updatedUser = await db.user.upsert({
                where: { id: userId },
                update: {
                    tier: "pro",
                    isOnTrial: true,
                    trialStartDate: now,
                    trialEndDate: trialEnd,
                    tierBeforeTrial: "free",
                    shortCredits: 999999,
                    mediumCredits: 999999
                } as any,
                create: {
                    id: userId,
                    email: `trial_${userId}@internal.db`,
                    tier: "pro",
                    isOnTrial: true,
                    trialStartDate: now,
                    trialEndDate: trialEnd,
                    tierBeforeTrial: "free",
                    shortCredits: 999999,
                    mediumCredits: 999999
                } as any
            }) as any;

            return NextResponse.json({
                success: true,
                message: "Trial activated! You now have 30 days of Pro access.",
                tier: updatedUser.tier,
                trialEndDate: updatedUser.trialEndDate,
                trialDaysRemaining: TRIAL_DAYS
            });
        }

        return NextResponse.json({ error: "INVALID_ACTION", message: "Invalid action." }, { status: 400 });

    } catch (error: unknown) {
        console.error("[TRIAL_POST_ERROR]", error);
        return NextResponse.json({ error: "SERVER_ERROR", message: "Failed to start trial." }, { status: 500 });
    }
}

