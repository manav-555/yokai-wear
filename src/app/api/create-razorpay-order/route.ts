import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid order amount" },
        { status: 400 }
      );
    }

    // In Razorpay Test Mode:
    // Amount is in smallest currency unit (paise: ₹1 = 100 paise)
    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;

    // Standard Razorpay Public Test Key (Sample Sandbox Key for instant testing)
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_sampleYokaiKey";

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amount * 100, // in paise
      currency,
      keyId: razorpayKeyId,
      notes: notes || { brand: "Yokai Wear", drop: "Drop 001" },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment gateway order" },
      { status: 500 }
    );
  }
}
