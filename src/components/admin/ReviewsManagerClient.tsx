"use client";

import React, { useState } from "react";
import { Review } from "@/types/database";
import { useToast } from "@/context/ToastContext";
import { Star, Check, X, ShieldCheck } from "@/components/icons";
import { formatDate } from "@/lib/utils";

interface ReviewsManagerClientProps {
  initialReviews: Review[];
}

export function ReviewsManagerClient({ initialReviews }: ReviewsManagerClientProps) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const toggleFeature = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r))
    );
    showToast("Review feature status updated", "success");
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast("Review deleted", "info");
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Social Proof &amp; Ratings
        </span>
        <h1 className="font-serif-heading text-3xl font-extrabold text-[#221610] tracking-tight">
          Customer Reviews Moderation ({reviews.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#786B62] mt-1">
          Review customer feedback and toggle featured highlights on the homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs text-[#786B62]">{formatDate(review.createdAt)}</span>
              </div>

              {review.title && (
                <h4 className="font-bold text-sm text-[#221610] mb-1">&quot;{review.title}&quot;</h4>
              )}

              <p className="text-xs sm:text-sm text-[#786B62] leading-relaxed italic">
                {review.comment}
              </p>
            </div>

            <div className="pt-3 border-t border-[#EBDCCB] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#221610]">{review.customerName}</span>
                <span className="text-[10px] text-emerald-700 block font-semibold">✓ Verified Customer</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFeature(review.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    review.isFeatured
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-[#FAF7F2] text-[#786B62] hover:bg-amber-50"
                  }`}
                >
                  {review.isFeatured ? "★ Featured on Home" : "Make Featured"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteReview(review.id)}
                  className="p-1.5 rounded-xl hover:bg-rose-50 text-[#786B62] hover:text-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
