"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Cake,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Youtube,
  ShieldCheck,
  Truck,
  Heart,
  Send,
} from "@/components/icons";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    showToast("Thank you for joining our VIP Sweet Treats club!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#1F1612] text-[#E8DFD8] border-t border-amber-950/60 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800/80">
          {/* Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-lg shrink-0 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Honey Bunny Bakers Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-2xl font-bold text-white tracking-tight leading-none">
                  Honey Bunny <span className="text-amber-400">Bakers</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200/80 mt-0.5">
                  Est. 2018 • Greater Noida
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-[#B8AAA0] leading-relaxed max-w-sm">
              Greater Noida&apos;s favourite 100% eggless home bakery (<strong>@honey_bunny_homebakers</strong>). Specializing in fresh fruit cakes, personalized designer celebration cakes, and artisanal home bakes crafted at Purvanchal Silver City II, Pi-2.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-red-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Bakery Links */}
          <div className="space-y-3">
            <h3 className="text-white font-serif-heading text-base font-bold">Explore Cakes</h3>
            <ul className="space-y-2 text-sm text-[#B8AAA0]">
              <li>
                <Link href="/cakes" className="hover:text-amber-400 transition-colors">
                  All Cakes & Bakes
                </Link>
              </li>
              <li>
                <Link href="/custom-cakes" className="hover:text-amber-400 transition-colors">
                  Custom Cake Studio
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=birthday-cakes" className="hover:text-amber-400 transition-colors">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=chocolate-cakes" className="hover:text-amber-400 transition-colors">
                  Belgian Chocolate Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=red-velvet-cakes" className="hover:text-amber-400 transition-colors">
                  Red Velvet Classics
                </Link>
              </li>
              <li>
                <Link href="/cakes?eggless=true" className="hover:text-amber-400 transition-colors">
                  100% Eggless Cakes
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery & Areas */}
          <div className="space-y-3">
            <h3 className="text-white font-serif-heading text-base font-bold">Delivery Zones</h3>
            <ul className="space-y-2 text-sm text-[#B8AAA0]">
              <li>
                <Link href="/locations" className="hover:text-amber-400 transition-colors">
                  Purvanchal Silver City II (Pi-2)
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-amber-400 transition-colors">
                  Pari Chowk & Alpha Sectors
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-amber-400 transition-colors">
                  Beta & Gamma Sectors
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-amber-400 transition-colors">
                  Greater Noida West (Ext.)
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-amber-400 transition-colors">
                  Track Live Order
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  Bakery Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-serif-heading text-base font-bold">Visit & Contact</h3>
            <div className="space-y-2.5 text-xs text-[#B8AAA0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{siteConfig.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.openingHours.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="pt-2">
              <label htmlFor="footer-newsletter" className="block text-xs font-semibold text-white mb-1.5">
                Get 10% Off Your First Order
              </label>
              <div className="flex gap-1.5">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-stone-900 border border-stone-700 px-3 py-2 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500 w-full"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shrink-0 transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar with FSSAI & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7C73] border-t border-stone-900 mt-2">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            {siteConfig.fssai && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{siteConfig.fssai.label}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/locations" className="hover:text-white transition-colors">
              Locations & Pickup
            </Link>
            <Link href="/track-order" className="hover:text-white transition-colors">
              Order Status
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
