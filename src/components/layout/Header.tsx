"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  MessageCircle,
  Menu,
  X,
  Cake,
  Sparkles,
  MapPin,
  Clock,
  PhoneCall,
  Truck,
  Layers,
  Heart,
} from "@/components/icons";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { SearchModal } from "@/components/layout/SearchModal";

export function Header() {
  const pathname = usePathname();
  const { isLoaded, itemCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/cakes", label: "Cakes & Menu", icon: Cake },
    { href: "/custom-cakes", label: "Custom Cake Studio", icon: Sparkles, highlight: true },
    { href: "/track-order", label: "Track Order", icon: Truck },
    { href: "/blog", label: "Bakery Stories", icon: Layers },
    { href: "/locations", label: "Location & Delivery", icon: MapPin },
  ];

  return (
    <>
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-[#221610] text-[#F5EFE6] text-xs py-2 px-4 border-b border-amber-950/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              100% Eggless Gourmet Options Available
            </span>
            <span className="hidden md:inline-block text-[#786B62]">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Same Day & Midnight Delivery in Greater Noida
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              {siteConfig.contact.phoneFormatted}
            </a>
            <span className="text-[#786B62]">|</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBDCCB] transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300/80 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Honey Bunny Bakers Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-[#221610] leading-none">
                  Honey Bunny <span className="text-amber-700">Bakers</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-800 mt-0.5">
                  Est. 2018 • 100% Eggless
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${isActive
                        ? "bg-amber-100/80 text-amber-900 shadow-xs"
                        : link.highlight
                          ? "text-amber-800 bg-amber-50 hover:bg-amber-100/70 border border-amber-200"
                          : "text-[#221610] hover:text-amber-800 hover:bg-amber-50/60"
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${link.highlight ? "text-amber-700 animate-pulse" : "text-[#786B62]"}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons: Search, Cart, WhatsApp CTA, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EBDCCB] text-[#786B62] hover:text-[#221610] hover:border-amber-600 transition-all shadow-xs text-xs font-medium"
                aria-label="Search cakes"
              >
                <Search className="w-4 h-4 text-amber-700" />
                <span className="hidden sm:inline-block">Search cakes...</span>
                <kbd className="hidden sm:inline-block bg-[#FAF7F2] px-1.5 py-0.5 rounded text-[10px] text-amber-900 border border-[#EBDCCB]">
                  ⌘K
                </kbd>
              </button>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-white border border-[#EBDCCB] text-[#221610] hover:border-amber-600 hover:bg-amber-50/60 transition-all shadow-xs"
                aria-label="Open basket"
              >
                <ShoppingBag className="w-5 h-5 text-amber-800" />
                {isLoaded && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-700 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Desktop WhatsApp CTA */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white border border-[#EBDCCB] text-[#221610] hover:bg-amber-50"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EBDCCB] bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${pathname === link.href
                      ? "bg-amber-100 text-amber-900"
                      : "text-[#221610] hover:bg-amber-50"
                    }`}
                >
                  <Icon className="w-5 h-5 text-amber-700" />
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#EBDCCB] space-y-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Chat & Order on WhatsApp
              </a>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-[#786B62] hover:text-[#221610]"
              >
                Admin Portal Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
