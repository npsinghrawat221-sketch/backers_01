"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ShoppingBag, Cake, Sparkles, Truck, Home } from "@/components/icons";
import { getWhatsAppUrl } from "@/config/site";
import { useCart } from "@/context/CartContext";

export function FloatingCTA() {
  const pathname = usePathname();
  const { isLoaded, itemCount, setIsCartOpen } = useCart();

  // Don't render floating CTA on checkout or admin pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/checkout")) {
    return null;
  }

  return (
    <>
      {/* Floating WhatsApp Bubble (Desktop & Tablet) */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-emerald-600/40 transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>

          <div className="w-6 h-6 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 leading-none">
              Need Help?
            </span>
            <span className="text-xs font-bold leading-tight">
              WhatsApp Us
            </span>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#EBDCCB] px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 items-center text-center">
          <Link
            href="/"
            className={`flex flex-col items-center py-1 rounded-xl text-[10px] font-medium transition-colors ${
              pathname === "/" ? "text-amber-800 font-bold" : "text-[#786B62]"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            Home
          </Link>

          <Link
            href="/cakes"
            className={`flex flex-col items-center py-1 rounded-xl text-[10px] font-medium transition-colors ${
              pathname === "/cakes" ? "text-amber-800 font-bold" : "text-[#786B62]"
            }`}
          >
            <Cake className="w-5 h-5 mb-0.5" />
            Cakes
          </Link>

          <Link
            href="/custom-cakes"
            className={`flex flex-col items-center py-1 rounded-xl text-[10px] font-medium transition-colors ${
              pathname === "/custom-cakes"
                ? "text-amber-800 font-bold"
                : "text-amber-700 font-semibold"
            }`}
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 mb-0.5 animate-pulse text-amber-600" />
            </div>
            Custom
          </Link>

          <Link
            href="/track-order"
            className={`flex flex-col items-center py-1 rounded-xl text-[10px] font-medium transition-colors ${
              pathname === "/track-order" ? "text-amber-800 font-bold" : "text-[#786B62]"
            }`}
          >
            <Truck className="w-5 h-5 mb-0.5" />
            Track
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center py-1 rounded-xl text-[10px] font-medium text-[#786B62] relative"
            aria-label="Open basket"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-0.5 text-amber-800" />
              {isLoaded && itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-700 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            Basket
          </button>
        </div>
      </div>
    </>
  );
}
