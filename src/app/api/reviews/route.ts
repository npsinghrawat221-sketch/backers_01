import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId") || undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;

    const reviews = await db.review.findMany({
      where: {
        productId,
        isApproved: true,
        isFeatured: featured,
      },
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, customerName, rating, title, comment } = body;

    if (!customerName || !rating || !comment) {
      return NextResponse.json({ success: false, error: "Missing required review fields" }, { status: 400 });
    }

    const review = await db.review.create({
      data: {
        productId: productId || undefined,
        customerName,
        rating: parseInt(rating),
        title: title || "",
        comment,
        isApproved: true, // auto-approve for demo
        isFeatured: false,
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
