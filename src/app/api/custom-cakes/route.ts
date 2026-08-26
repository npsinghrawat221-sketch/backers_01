import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const inquiries = await db.customCakeRequest.findMany({
      where: { status },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error("GET /api/custom-cakes error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch custom cake inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      customerWhatsapp,
      occasion,
      flavor,
      tierSizeKg,
      servingsEstimate,
      referenceImageUrl,
      designNotes,
      cakeMessage,
      themeColor,
      toppings,
      nameOnCake,
      ageOnCake,
      isEggless,
      deliveryDate,
      deliverySlot,
      deliveryType,
      address,
      estimatedPriceMin,
      estimatedPriceMax,
    } = body;

    if (!customerName || !customerPhone || !occasion || !flavor) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required custom cake details" },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const inquiryNumber = `CC-2026-${randomSuffix}`;

    const inquiry = await db.customCakeRequest.create({
      data: {
        inquiryNumber,
        customerName,
        customerPhone,
        customerEmail: customerEmail || `${customerPhone}@customer.honeybunnybakers.com`,
        customerWhatsapp: customerWhatsapp || customerPhone,
        occasion,
        flavor,
        tierSizeKg: tierSizeKg || "1 kg",
        servingsEstimate: servingsEstimate || "8-12 Servings",
        referenceImageUrl: referenceImageUrl || null,
        designNotes: designNotes || "",
        cakeMessage: cakeMessage || "",
        themeColor: themeColor || "",
        toppings: toppings || "",
        nameOnCake: nameOnCake || "",
        ageOnCake: ageOnCake || "",
        isEggless: isEggless !== undefined ? isEggless : true,
        deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
        deliverySlot: deliverySlot || "Afternoon Slot",
        deliveryType: deliveryType || "DELIVERY",
        address: address || "",
        estimatedPriceMin: estimatedPriceMin || 1200,
        estimatedPriceMax: estimatedPriceMax || 1800,
        quotationPrice: undefined,
        adminNotes: undefined,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("POST /api/custom-cakes error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit custom cake inquiry" }, { status: 500 });
  }
}
