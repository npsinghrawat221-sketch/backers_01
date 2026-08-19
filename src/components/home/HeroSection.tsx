"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  Star,
  Award,
  Truck,
} from "@/components/icons";
import { siteConfig, getWhatsAppUrl } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bakery-hero pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EBDCCB]">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EBDCCB] shadow-xs text-xs font-semibold text-amber-900 mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>100% Eggless Home Bakery • Greater Noida</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#221610] tracking-tight leading-[1.12]">
              Fresh Fruit Cakes &amp; Custom Bakes for Every{" "}
              <span className="text-amber-800 italic underline decoration-amber-300 decoration-wavy decoration-2">
                Celebration
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6E5F55] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Freshly baked 100% eggless gourmet cakes, signature fresh fruit gateaus, and personalized designer cakes handcrafted with love at Purvanchal Silver City II, Greater Noida. Order directly on WhatsApp!
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/cakes"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-base shadow-lg hover:shadow-xl hover:shadow-amber-700/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Order a Cake</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/custom-cakes"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-800/30 hover:border-amber-800 font-bold text-base shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span>Customize Your Cake</span>
              </Link>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#EBDCCB]/80 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-xs sm:text-sm text-[#221610]">Same Day Delivery</h2>
                  <p className="text-[11px] text-[#786B62]">In 2-3 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center text-emerald-800 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-xs sm:text-sm text-[#221610]">100% Eggless</h2>
                  <p className="text-[11px] text-[#786B62]">Cloud-soft texture</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100/70 flex items-center justify-center text-rose-800 shrink-0">
                  <Star className="w-5 h-5 fill-rose-600 text-rose-600" />
                </div>
                <div>
                  <h2 className="font-bold text-xs sm:text-sm text-[#221610]">4.95 ★ Rating</h2>
                  <p className="text-[11px] text-[#786B62]">2,500+ celebrations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Cake Featured Image Card */}
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
                  alt="Signature Belgian Dark Chocolate Truffle Cake"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                      Signature Bestseller
                    </span>
                    <h3 className="font-bold text-sm text-[#221610]">
                      Fresh Mixed Fruit Gateau
                    </h3>
                    <p className="text-xs text-amber-900 font-semibold">Starting at ₹600 (100% Eggless)</p>
                  </div>
                  <Link
                    href="/cakes/fresh-mixed-fruit-cake"
                    className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </div>

              {/* Floating Official Honey Bunny Logo Badge (Top Right) */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl border-2 border-amber-200 flex items-center gap-3 animate-float">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-300 shadow-xs shrink-0 bg-white">
                  <Image
                    src="/images/logo.png"
                    alt="Honey Bunny Logo Badge"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#221610]">Honey Bunny Bakers</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Est. 2018 • 100% Eggless</div>
                </div>
              </div>

              {/* Floating Midnight Delivery Pill (Bottom Left) */}
              <div className="hidden sm:flex absolute -bottom-4 -left-6 bg-[#221610] text-white px-4 py-2.5 rounded-2xl shadow-xl items-center gap-2.5 border border-amber-900/60">
                <Truck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold">Greater Noida Doorstep Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
