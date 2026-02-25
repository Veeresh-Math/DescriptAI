import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { tier } = await req.json();

        // Standard Prices (hardcoded for now, should use Stripe Price IDs in production)
        let priceId = "";
        if (tier === "pro") priceId = "price_pro_placeholder"; // Replace with real ID
        if (tier === "agency") priceId = "price_agency_placeholder"; // Replace with real ID

        if (!priceId) {
            return NextResponse.json({ error: "Invalid tier selected" }, { status: 400 });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn("[CHECKOUT_DEMO_MODE] No Stripe key found. Providing demo redirect.");
            return NextResponse.json({
                url: `${process.env.NEXT_PUBLIC_APP_URL}/generate?success=true&demo=true`,
                message: "DEMO MODE: Stripe key is missing. We've simulated a successful upgrade for testing."
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `DescriptAI ${tier.toUpperCase()} Plan`,
                            description: `Unlimited generations and ${tier === 'pro' ? 'Chrome Extension' : 'Agency Command Suite'} access.`,
                        },
                        unit_amount: tier === "pro" ? 1900 : 4900,
                        recurring: { interval: "month" },
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/generate?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
            metadata: {
                userId,
                email: user.emailAddresses[0].emailAddress,
                tier
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("[CHECKOUT_ERROR]", error);
        const message = error instanceof Error ? error.message : "Internal Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

