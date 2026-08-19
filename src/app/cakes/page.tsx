import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { Cake, Sparkles, Filter, SlidersHorizontal } from "@/components/icons";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Artisanal Cakes & Gourmet Patisserie Menu",
  description:
    "Explore our complete handcrafted cake collection: 100% eggless birthday cakes, Belgian dark chocolate truffles, red velvet, and exotic fruit gateaus with same-day delivery in Bangalore.",
};

interface CakesPageProps {
  searchParams: Promise<{
    category?: string;
    eggless?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function CakesPage({ searchParams }: CakesPageProps) {
  const { category, eggless, sort, search } = await searchParams;

  const [categories, allProducts] = await Promise.all([
    db.category.findMany({ where: { isActive: true } }),
    db.product.findMany({
      where: {
        categorySlug: category,
        isEggless: eggless === "true" ? true : undefined,
        search,
      },
    }),
  ]);

  let products = [...allProducts];

  if (sort === "price-low") {
    products.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === "price-high") {
    products.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: Bestsellers first
    products.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "All Cakes", url: `${siteConfig.url}/cakes` },
  ];

  const currentCategory = categories.find((c) => c.slug === category);

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
          <span className="text-[#221610] font-semibold">
            {currentCategory ? currentCategory.name : "All Cakes"}
          </span>
        </nav>

        {/* Page Title & Subheading */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Cake className="w-3.5 h-3.5 text-amber-700" />
            <span>Fresh Daily Patisserie</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#221610] tracking-tight">
            {currentCategory ? currentCategory.name : "Handcrafted Cakes & Desserts"}
          </h1>
          <p className="text-sm text-[#786B62] mt-2 max-w-2xl">
            {currentCategory?.description ||
              "Browse our chef-crafted selection of 100% eggless cakes, gourmet cupcakes, brownies, and celebration masterpieces. Baked fresh to order with pure Belgian chocolate and real vanilla."}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-[#EBDCCB] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills (Horizontal scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <Link
              href="/cakes"
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                !category
                  ? "bg-amber-800 text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#221610] hover:bg-amber-50"
              }`}
            >
              All ({allProducts.length})
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/cakes?category=${cat.slug}${eggless ? `&eggless=${eggless}` : ""}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  category === cat.slug
                    ? "bg-amber-800 text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#221610] hover:bg-amber-50"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Controls: Eggless toggle & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Eggless toggle */}
            <Link
              href={`/cakes?${category ? `category=${category}&` : ""}${
                eggless === "true" ? "" : "eggless=true"
              }`}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                eggless === "true"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${eggless === "true" ? "bg-white" : "bg-emerald-600"}`} />
              100% Eggless Only
            </Link>

            {/* Sort Options */}
            <div className="flex items-center gap-1 text-xs text-[#786B62]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <Link
                href={`/cakes?${category ? `category=${category}&` : ""}${eggless ? `eggless=${eggless}&` : ""}sort=price-low`}
                className={`px-2 py-1 rounded-lg ${sort === "price-low" ? "font-bold text-amber-900 bg-amber-100" : "hover:text-[#221610]"}`}
              >
                Price: Low
              </Link>
              <Link
                href={`/cakes?${category ? `category=${category}&` : ""}${eggless ? `eggless=${eggless}&` : ""}sort=price-high`}
                className={`px-2 py-1 rounded-lg ${sort === "price-high" ? "font-bold text-amber-900 bg-amber-100" : "hover:text-[#221610]"}`}
              >
                Price: High
              </Link>
            </div>
          </div>
        </div>

        {/* Product Listing Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#EBDCCB] p-8">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-800">
              <Cake className="w-8 h-8" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-[#221610] mb-2">
              No cakes found matching your selection
            </h3>
            <p className="text-sm text-[#786B62] max-w-md mx-auto mb-6">
              Try resetting your category or eggless filters, or design a custom cake with our cake artists.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/cakes"
                className="px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-bold"
              >
                Reset Filters
              </Link>
              <Link
                href="/custom-cakes"
                className="px-5 py-2.5 rounded-xl bg-white border border-[#EBDCCB] text-amber-900 text-xs font-bold hover:bg-amber-50"
              >
                Custom Cake Studio
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
