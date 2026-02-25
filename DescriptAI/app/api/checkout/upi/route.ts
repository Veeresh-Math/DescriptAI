import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PRICING } from "@/lib/payments";

// UPI Payment API - Supports PhonePe, Google Pay, Paytm via Razorpay
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tier, method } = body;

    if (!tier || !['pro', 'agency'].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Validate UPI method
    const validMethods = ['upi', 'phonepe', 'gpay', 'paytm'];
    const paymentMethod = method || 'upi';

    const amount = PRICING[tier as keyof typeof PRICING].inr;
    const planName = PRICING[tier as keyof typeof PRICING].name;

    // Create Razorpay order with UPI specific settings
    const orderData = {
      amount: amount * 100, // Razorpay expects paise (INR * 100)
      currency: "INR",
      receipt: `descriptai_${userId}_${Date.now()}`,
      method: "upi", // Force UPI payment
      notes: {
        userId: userId,
        tier: tier,
        plan: planName,
        paymentMethod: paymentMethod
      }
    };

    // If no Razorpay credentials, return demo response
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        success: true,
        demo: true,
        message: "Demo mode - Payment would be processed via " + getMethodName(paymentMethod),
        method: paymentMethod,
        amount: amount,
        tier: tier,
        upiId: "descriptai@upi",
        // Demo QR code URL (placeholder)
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=descriptai@upi&pn=DescriptAI&am=${amount}&cu=INR`
      });
    }

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
      console.error("Razorpay UPI error:", error);
      return NextResponse.json({ error: "Failed to create UPI order" }, { status: 500 });
    }

    const order = await response.json();

    // Generate UPI deep links for each provider
    const upiId = "descriptai@upi";
    const upiLinks = {
      phonepe: `phonepe://pay?pa=${upiId}&pn=DescriptAI&am=${amount}&cu=INR&tn=DescriptAI_${tier}_${userId}`,
      gpay: `gpay://pay?pa=${upiId}&pn=DescriptAI&am=${amount}&cu=INR&tn=DescriptAI_${tier}_${userId}`,
      paytm: `paytm://pay?pa=${upiId}&pn=DescriptAI&am=${amount}&cu=INR&tn=DescriptAI_${tier}_${userId}`,
      upi: `upi://pay?pa=${upiId}&pn=DescriptAI&am=${amount}&cu=INR&tn=DescriptAI_${tier}_${userId}`
    };

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      tier: tier,
      planName: planName,
      method: paymentMethod,
      upiLinks: upiLinks,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLinks[paymentMethod as keyof typeof upiLinks] || upiLinks.upi)}`
    });

  } catch (error) {
    console.error("UPI Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getMethodName(method: string): string {
  const methods: Record<string, string> = {
    'upi': 'UPI',
    'phonepe': 'PhonePe',
    'gpay': 'Google Pay',
    'paytm': 'Paytm'
  };
  return methods[method] || 'UPI';
}
