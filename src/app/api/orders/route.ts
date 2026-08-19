import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderItem } from "@/types/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || undefined;
    const status = searchParams.get("status") || undefined;

    const orders = await db.order.findMany({
      where: { userId, status },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryType,
      address,
      landmark,
      city,
      postalCode,
      deliveryDate,
      deliverySlot,
      cakeMessage,
      orderNotes,
      subtotal,
      discount,
      deliveryCharge,
      tax,
      total,
      paymentMethod,
      paymentStatus,
      razorpayOrderId,
      razorpayPaymentId,
      items,
      userId,
    } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required order details" },
        { status: 400 }
      );
    }

    // Generate unique Bakery Order Number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BAK-2026-${randomSuffix}`;

    const orderItems: OrderItem[] = items.map((item: any, idx: number) => ({
      id: `item-${Date.now()}-${idx}`,
      orderId: "", // will be linked
      productId: item.productId,
      variantId: item.variantId,
      variantName: item.variantName,
      weightKg: item.weightKg,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      cakeMessage: item.cakeMessage,
      eggless: item.eggless,
      totalPrice: item.unitPrice * item.quantity,
    }));

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: userId || undefined,
        customerName,
        customerEmail: customerEmail || `${customerPhone}@customer.honeybunnybakers.com`,
        customerPhone,
        deliveryType: deliveryType || "DELIVERY",
        address: address || "",
        landmark: landmark || "",
        city: city || "Greater Noida",
        postalCode: postalCode || "201310",
        deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
        deliverySlot: deliverySlot || "Standard Delivery",
        cakeMessage: cakeMessage || "",
        orderNotes: orderNotes || "",
        subtotal: parseFloat(subtotal) || 0,
        discount: parseFloat(discount) || 0,
        deliveryCharge: parseFloat(deliveryCharge) || 0,
        tax: parseFloat(tax) || 0,
        total: parseFloat(total) || 0,
        status: "PLACED",
        paymentStatus: paymentStatus || (paymentMethod === "COD" ? "PENDING" : "PAID"),
        paymentMethod: paymentMethod || "COD",
        razorpayOrderId: razorpayOrderId || null,
        razorpayPaymentId: razorpayPaymentId || null,
        items: orderItems,
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}
