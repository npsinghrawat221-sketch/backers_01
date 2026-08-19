import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const amountStr = searchParams.get("amount");
    const amount = amountStr ? parseFloat(amountStr) : 0;

    if (!code) {
      return NextResponse.json({ valid: false, message: "Coupon code is required" }, { status: 400 });
    }

    const coupon = await db.coupon.findUnique({
      where: { code },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ valid: false, message: "Invalid or expired coupon code" }, { status: 404 });
    }

    if (amount < coupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon`,
      }, { status: 400 });
    }

    let discount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      const calculated = (amount * coupon.discountValue) / 100;
      discount = coupon.maxDiscount ? Math.min(calculated, coupon.maxDiscount) : calculated;
    } else {
      discount = coupon.discountValue;
    }

    return NextResponse.json({
      valid: true,
      coupon,
      discount: Math.round(discount),
      message: `Coupon applied! You save ₹${Math.round(discount)}`,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json({ valid: false, message: "Error validating coupon" }, { status: 500 });
  }
}
