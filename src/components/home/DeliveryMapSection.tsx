"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Truck, CheckCircle2, Search, ArrowRight } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function DeliveryMapSection() {
  const [pincode, setPincode] = useState("");
  const [checkResult, setCheckResult] = useState<{ available: boolean; message: string } | null>(null);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setCheckResult({ available: false, message: "Please enter a valid 6-digit PIN code" });
      return;
    }

    // Greater Noida and Noida pincodes start with 201
    if (pincode.startsWith("201")) {
      setCheckResult({
        available: true,
        message: `🎉 Great news! Same-day & Express delivery is active in PIN ${pincode} (${siteConfig.address.city}).`,
      });
    } else {
      setCheckResult({
        available: false,
        message: `Delivery to ${pincode} is available on advance custom cake orders. WhatsApp us directly!`,
      });
    }
  };

  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              <span>Greater Noida Doorstep Delivery</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
              Freshly Baked &amp; Hand-Delivered in Chilled Safe Packaging
            </h2>

            <p className="text-sm text-[#786B62] leading-relaxed">
              From our home bakery studio in Purvanchal Silver City II (Sector Pi-2), we deliver fresh 100% eggless cakes across Greater Noida (Pari Chowk, Alpha, Beta, Gamma, Delta, Greater Noida West, and Noida Expressway) with extreme care.
            </p>

            {/* Pincode Availability Checker */}
            <div className="p-5 rounded-2xl bg-white border border-[#EBDCCB] shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#221610] mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-700" /> Check Delivery at Your Location
              </h4>
              
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit PIN code (e.g. 560034)"
                  className="flex-1 bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] placeholder:text-[#786B62] focus:outline-none focus:border-amber-600 font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors shrink-0"
                >
                  Check
                </button>
              </form>

              {checkResult && (
                <div
                  className={`mt-3 p-3 rounded-xl text-xs font-semibold flex items-start gap-2 ${
                    checkResult.available
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-amber-50 text-amber-900 border border-amber-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{checkResult.message}</span>
                </div>
              )}
            </div>

            {/* Service Areas Tags */}
            <div>
              <div className="text-xs font-bold text-[#221610] uppercase tracking-wider mb-2.5">
                Prime Delivery Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.delivery.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-xl bg-white border border-[#EBDCCB] text-xs font-medium text-[#221610] shadow-2xs"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Map & Hours (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Google Maps Embed Container */}
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <iframe
                title="Velvet & Crumb Bakery Location"
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

            {/* Address & Hours Bar */}
            <div className="p-5 rounded-3xl bg-white border border-[#EBDCCB] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#221610]">{siteConfig.openingHours.days}</div>
                  <div className="text-xs text-emerald-700 font-semibold">{siteConfig.openingHours.hours} (Open Now)</div>
                </div>
              </div>

              <Link
                href="/locations"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors"
              >
                <span>Full Location Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
