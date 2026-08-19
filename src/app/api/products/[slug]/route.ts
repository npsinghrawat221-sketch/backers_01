import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await db.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await db.product.findUnique({ where: { slug } });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();
    const updated = await db.product.update({
      where: { id: product.id },
      data: body,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("PATCH /api/products/[slug] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await db.product.findUnique({ where: { slug } });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    await db.product.delete({ where: { id: product.id } });
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /api/products/[slug] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
