import React from "react";
import { Star, CheckCircle2, Quote } from "@/components/icons";
import { Review } from "@/types/database";

interface CustomerReviewsProps {
  reviews: Review[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
            Loved by 2,500+ Celebrations
          </h2>
          <p className="text-sm text-[#786B62]">
            Read genuine feedback from cake lovers who celebrated their milestones with our bakery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between card-hover-lift"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {review.title && (
                  <h4 className="font-serif-heading text-base font-bold text-[#221610] mb-2 line-clamp-1">
                    &quot;{review.title}&quot;
                  </h4>
                )}

                <p className="text-xs sm:text-sm text-[#786B62] leading-relaxed italic line-clamp-4">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EBDCCB]/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#221610]">{review.customerName}</div>
                  <div className="text-[10px] text-[#786B62]">Verified Order</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
