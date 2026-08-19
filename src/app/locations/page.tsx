import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "@/components/icons";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { getLocalBusinessSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "100% Eggless Bakery Near Me | Purvanchal Silver City II & Greater Noida Cake Delivery",
  description:
    "Honey Bunny Bakers (honey_bunny_homebakers) is a 100% eggless home bakery at Purvanchal Silver City II, Sector Pi II, Greater Noida. Order fresh fruit cakes, customized celebration cakes, and doorstep delivery across Greater Noida & Noida.",
  keywords: [
    "bakery near me greater noida",
    "eggless cake shop in greater noida",
    "home bakery purvanchal silver city 2",
    "custom cakes greater noida pi 2",
    "fresh fruit cake greater noida",
    "honey bunny bakers",
    "honey_bunny_homebakers",
    "birthday cake delivery greater noida",
    "eggless cakes pari chowk",
  ],
};

export default function LocationsPage() {
  const localBusinessSchema = getLocalBusinessSchema();
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Locations & Delivery Areas", url: `${siteConfig.url}/locations` },
  ];

  const deliveryNeighborhoods = [
    {
      name: "Purvanchal Silver City II & Sector Pi 2",
      timing: "Within 30-45 Mins",
      landmark: "Sector Pi-2 / Gate 1 & 2",
      tag: "Home Bakery Studio (Pickup Available)",
    },
    {
      name: "Sector Pi 1 & Sector Chi / Omega",
      timing: "Within 30-45 Mins",
      landmark: "Near JP Greens / Eldeco Utopia",
      tag: "Express Local Delivery",
    },
    {
      name: "Pari Chowk & Alpha 1, 2",
      timing: "Within 45-60 Mins",
      landmark: "Commercial Belt / Alpha Metro",
      tag: "Express Delivery",
    },
    {
      name: "Beta 1, 2 & Gamma 1, 2",
      timing: "Within 45-60 Mins",
      landmark: "Beta Plaza / Gamma Shopping Complex",
      tag: "Express Delivery",
    },
    {
      name: "Delta, Zeta, Eta & Surajpur",
      timing: "Within 60 Mins",
      landmark: "Delta 1 Metro / Collectorate",
      tag: "Same Day Delivery",
    },
    {
      name: "Knowledge Park I, II, III",
      timing: "Within 45-60 Mins",
      landmark: "University Campuses & Hostels",
      tag: "College Celebration Delivery",
    },
    {
      name: "Greater Noida West (Noida Ext.)",
      timing: "Within 60-90 Mins",
      landmark: "Gaur City / Ek Murti / Cherry County",
      tag: "Scheduled Same-Day",
    },
    {
      name: "Noida Expressway (Sec 137, 143, 150)",
      timing: "Within 60-90 Mins",
      landmark: "Purvanchal Royal City / Advant Navis",
      tag: "Express Delivery",
    },
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#786B62]">
          <Link href="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#221610] font-semibold">Locations &amp; Delivery</span>
        </nav>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Greater Noida Home Bakery &amp; Doorstep Delivery</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#221610] tracking-tight">
            Honey Bunny Bakers Studio &amp; Delivery Areas
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62] leading-relaxed">
            Order 100% eggless artisanal bakes from our home bakery studio at Purvanchal Silver City II, Pi-2 Greater Noida. Fast doorstep delivery and WhatsApp orders.
          </p>
        </div>

        {/* Studio Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Studio Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xl space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Home Bakery Studio
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-[#221610] mt-1">
                Honey Bunny Bakers
              </h2>
              <p className="text-xs text-[#786B62] mt-1">
                100% Eggless fresh fruit cakes, personalized designer celebration cakes, and home-baked goodness.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#786B62]">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#221610] block">Address:</strong>
                  <span>{siteConfig.address.fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#221610] block">Baking &amp; Delivery Timings:</strong>
                  <span>{siteConfig.openingHours.days}</span>
                  <div className="text-emerald-700 font-bold text-xs mt-0.5">
                    {siteConfig.openingHours.hours} (Open All 7 Days)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
                <Phone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#221610] block">WhatsApp Orders &amp; Inquiries:</strong>
                  <a href={getWhatsAppUrl()} className="hover:text-amber-800 font-bold text-[#221610]">
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </div>
              </div>

              {siteConfig.fssai && (
                <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <strong className="text-xs font-bold text-emerald-950">Govt. FSSAI Certified Home Bakery</strong>
                  </div>
                  <div className="text-[11px] text-emerald-900 space-y-0.5 pl-7">
                    <div><span className="font-semibold">Reg. ID:</span> {siteConfig.fssai.licenseNumber}</div>
                    <div><span className="font-semibold">Operator:</span> {siteConfig.fssai.registeredName}</div>
                    <div><span className="font-semibold">Issuing Authority:</span> {siteConfig.fssai.issuingAuthority} (Valid upto 2031)</div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl("Hello Honey Bunny Bakers! I would like to order a fresh eggless cake for delivery in Greater Noida.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Directly on WhatsApp</span>
              </a>

              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#FAF7F2] hover:bg-amber-100 text-amber-900 border border-[#EBDCCB] font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Open in Google Maps Navigation</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Map (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-amber-50">
              <iframe
                title="Honey Bunny Bakers Greater Noida Location"
                src={siteConfig.address.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Greater Noida Neighborhood Delivery Radii */}
        <div className="space-y-6 pt-6">
          <div className="text-center sm:text-left">
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610]">
              Doorstep Cake Delivery Coverage Across Greater Noida &amp; Noida
            </h2>
            <p className="text-xs sm:text-sm text-[#786B62] mt-1">
              Freshly baked 100% eggless cakes delivered in safe chilled packaging across Greater Noida sectors and Expressways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {deliveryNeighborhoods.map((zone, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-heading text-base font-bold text-[#221610]">
                    {zone.name}
                  </h3>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {zone.tag}
                </span>

                <div className="space-y-1 text-xs text-[#786B62] pt-1">
                  <div>
                    Timing: <strong className="text-[#221610]">{zone.timing}</strong>
                  </div>
                  <div>
                    Area: <span className="text-[#221610]">{zone.landmark}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/cakes?location=${encodeURIComponent(zone.name)}`}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                  >
                    <span>Order Cakes</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
