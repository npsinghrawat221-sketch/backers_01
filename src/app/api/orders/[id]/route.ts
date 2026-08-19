import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    const order = await db.order.findUnique({
      where: id.startsWith("BAK-") ? { orderNumber: id } : { id },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // If phone number verification is requested
    if (phone) {
      const cleanInput = phone.replace(/\D/g, "");
      const cleanOrderPhone = order.customerPhone.replace(/\D/g, "");
      if (!cleanOrderPhone.endsWith(cleanInput) && !cleanInput.endsWith(cleanOrderPhone)) {
        return NextResponse.json(
          { success: false, error: "Phone number does not match order record" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const order = await db.order.findUnique({
      where: id.startsWith("BAK-") ? { orderNumber: id } : { id },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const updated = await db.order.update({
      where: { id: order.id },
      data: body,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("PATCH /api/orders/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
  }
}
