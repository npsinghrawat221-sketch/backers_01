import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inquiry = await db.customCakeRequest.findUnique({
      where: id.startsWith("CC-") ? { inquiryNumber: id } : { id },
    });

    if (!inquiry) {
      return NextResponse.json({ success: false, error: "Custom cake inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("GET /api/custom-cakes/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch inquiry" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const inquiry = await db.customCakeRequest.findUnique({
      where: id.startsWith("CC-") ? { inquiryNumber: id } : { id },
    });

    if (!inquiry) {
      return NextResponse.json({ success: false, error: "Custom cake inquiry not found" }, { status: 404 });
    }

    const updated = await db.customCakeRequest.update({
      where: { id: inquiry.id },
      data: body,
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("PATCH /api/custom-cakes/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update inquiry" }, { status: 500 });
  }
}
