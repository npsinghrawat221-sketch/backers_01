import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Upload, Layers, MessageCircle, Heart } from "@/components/icons";
import { getWhatsAppUrl } from "@/config/site";

export function CustomCakeBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#221610] via-[#2A1B14] to-[#1A100B] text-white relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke 3D &amp; Multi-Tier Cake Studio</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Have a Dream Cake Design in Mind?{" "}
              <span className="text-amber-400 italic">We Handcraft It to Perfection.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D4C5BB] leading-relaxed max-w-xl">
              Upload your Pinterest or Instagram reference image, choose your favorite flavors, specify tiers and custom toppers. Our master cake decorators will provide an instant estimated quotation and bake your edible masterpiece!
            </p>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 mb-2">
                  <Upload className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">1. Photo Reference</h4>
                <p className="text-xs text-[#B8AAA0] mt-0.5">Upload any photo or design idea</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">2. Flavor &amp; Tiers</h4>
                <p className="text-xs text-[#B8AAA0] mt-0.5">Select sponge, weight &amp; theme</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-2">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">3. Instant Quote</h4>
                <p className="text-xs text-[#B8AAA0] mt-0.5">Fast WhatsApp confirmation</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
              <Link
                href="/custom-cakes"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-xl hover:shadow-amber-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Launch Custom Cake Builder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={getWhatsAppUrl("Hello Honey Bunny Bakers! I have a custom cake reference photo I'd like to share for a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Cake Artist</span>
              </a>
            </div>
          </div>

          {/* Right Showcase Photo Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop"
                  alt="Custom Designer Tiered Cake Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-[#221610] p-4 rounded-2xl shadow-2xl border border-[#EBDCCB] max-w-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-serif-heading font-bold">
                  ₹
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800">Dynamic Estimator</span>
                  <p className="text-xs font-bold text-[#221610]">Real-time price calculations based on weight and complexity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
