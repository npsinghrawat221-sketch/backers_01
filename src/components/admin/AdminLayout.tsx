"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  Cake,
  Tag,
  Star,
  ArrowLeft,
  Store,
  Layers,
} from "@/components/icons";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders Management", icon: ShoppingBag },
    { href: "/admin/custom-cakes", label: "Custom Cake Inquiries", icon: Sparkles },
    { href: "/admin/products", label: "Products & Menu", icon: Cake },
    { href: "/admin/coupons", label: "Coupons & Offers", icon: Tag },
    { href: "/admin/reviews", label: "Reviews Moderation", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#F4EDE3] flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="w-full md:w-64 bg-[#221610] text-[#E8DFD8] p-5 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-400/80 shadow-md shrink-0 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Honey Bunny Bakers Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif-heading text-base font-bold text-white block leading-none">
                  Honey Bunny
                </span>
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                  Admin Studio
                </span>
              </div>
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-amber-700 text-white shadow-sm"
                      : "text-[#B8AAA0] hover:text-white hover:bg-stone-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800 space-y-2 mt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>View Public Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
