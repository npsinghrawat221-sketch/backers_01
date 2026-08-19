import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, MessageCircle } from "@/components/icons";
import { CustomCakeBuilder } from "@/components/custom-cake/CustomCakeBuilder";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Custom Cake Studio & Online 3D Designer",
  description:
    "Design your custom celebration cake in 7 simple steps. Upload reference images, select Belgian chocolate or Red Velvet sponges, choose tiers, and get an instant quotation in Bangalore.",
};

export default function CustomCakesPage() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Custom Cake Studio", url: `${siteConfig.url}/custom-cakes` },
  ];

  return (
    <div className="py-10 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#786B62] mb-6">
          <Link href="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#221610] font-semibold">Custom Cake Studio</span>
        </nav>

        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Cake Builder</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#221610] tracking-tight">
            Design Your Custom Cake
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62]">
            Follow our 7-step builder to customize flavor, tiers, toppers, and photo reference. Get an instant estimate and WhatsApp confirmation.
          </p>
        </div>

        {/* Multi-Step Interactive Builder Component */}
        <CustomCakeBuilder />
      </div>
    </div>
  );
}
