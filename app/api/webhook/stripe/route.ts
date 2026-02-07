import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ""
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;

        if (!userId || !tier) {
            return new NextResponse("Webhook Error: Missing metadata", { status: 400 });
        }

        // Upgrade user in Database
        try {
            await db.user.update({
                where: { id: userId },
                data: { tier: tier.toLowerCase() }
            });
            console.log(`[STRIPE_WEBHOOK] User ${userId} upgraded to ${tier}`);
        } catch (dbError) {
            console.error("[STRIPE_WEBHOOK_DB_ERROR]", dbError);
            return new NextResponse("Webhook Error: Database update failed", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
