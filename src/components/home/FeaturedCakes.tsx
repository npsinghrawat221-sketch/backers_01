"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "@/components/icons";
import { Product } from "@/types/database";
import { ProductCard } from "@/components/product/ProductCard";

interface FeaturedCakesProps {
  products: Product[];
}

export function FeaturedCakes({ products }: FeaturedCakesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", label: "All Creations" },
    { id: "bestsellers", label: "🔥 Bestsellers" },
    { id: "eggless", label: "🌱 100% Eggless" },
    { id: "chocolate", label: "🍫 Chocolate" },
    { id: "special", label: "✨ Chef's Special" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "bestsellers") return p.isBestseller;
    if (activeTab === "eggless") return p.isEggless;
    if (activeTab === "chocolate") return p.categoryId === "cat-3" || p.slug.includes("chocolate");
    if (activeTab === "special") return p.isSpecial;
    return true;
  });

  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Baked Fresh Every Morning</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
              Bestsellers &amp; Chef Specials
            </h2>
          </div>

          <Link
            href="/cakes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 hover:underline transition-colors"
          >
            <span>Explore All 25+ Cakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-amber-800 text-white shadow-md shadow-amber-900/20"
                  : "bg-white text-[#221610] border border-[#EBDCCB] hover:bg-amber-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
