import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PRICING } from "@/lib/payments";

// Razorpay API credentials
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tier } = body;

    if (!tier || !['pro', 'agency'].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const amount = PRICING[tier as keyof typeof PRICING].inr;
    const planName = PRICING[tier as keyof typeof PRICING].name;

    // Create Razorpay order
    const orderData = {
      amount: amount * 100, // Razorpay expects paise (INR * 100)
      currency: "INR",
      receipt: `descriptai_${userId}_${Date.now()}`,
      notes: {
        userId: userId,
        tier: tier,
        plan: planName
      }
    };

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Razorpay error:", error);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const order = await response.json();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      tier: tier,
      planName: planName
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

