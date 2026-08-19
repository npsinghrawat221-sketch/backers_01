import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category") || undefined;
    const isEggless = searchParams.get("eggless") === "true" ? true : undefined;
    const isBestseller = searchParams.get("bestseller") === "true" ? true : undefined;
    const isFeatured = searchParams.get("featured") === "true" ? true : undefined;
    const isSpecial = searchParams.get("special") === "true" ? true : undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

    const products = await db.product.findMany({
      where: {
        categorySlug,
        isEggless,
        isBestseller,
        isFeatured,
        isSpecial,
        search,
      },
      take: limit,
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await db.product.create({
      data: body,
    });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}
