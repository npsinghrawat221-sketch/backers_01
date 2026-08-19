import React from "react";
import { db } from "@/lib/db";
import { ReviewsManagerClient } from "@/components/admin/ReviewsManagerClient";

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviews = await db.review.findMany();
  return <ReviewsManagerClient initialReviews={reviews} />;
}
