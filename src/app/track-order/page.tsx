import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TrackOrderClient } from "@/components/order/TrackOrderClient";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import { Loader2 } from "@/components/icons";

export const metadata: Metadata = {
  title: "Track Your Cake Order Live | Velvet & Crumb",
  description:
    "Track the live status of your bakery order or custom cake. Real-time updates from baking and packaging to out-for-delivery in Bangalore.",
};

export default function TrackOrderPage() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Track Order", url: `${siteConfig.url}/track-order` },
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#786B62] mb-6">
          <Link href="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#221610] font-semibold">Track Order</span>
        </nav>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
            </div>
          }
        >
          <TrackOrderClient />
        </Suspense>
      </div>
    </div>
  );
}
