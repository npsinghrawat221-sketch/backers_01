"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Sparkles, Check } from "@/components/icons";
import { Product } from "@/types/database";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] || { id: "default", name: "Standard", price: product.basePrice, weightKg: 0.5 }
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.url || "/placeholder-cake.jpg",
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      weightKg: selectedVariant.weightKg,
      unitPrice: selectedVariant.price,
      quantity: 1,
      eggless: product.isEggless,
    });

    showToast(`Added "${product.name} (${selectedVariant.name})" to basket!`, "success");

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#EBDCCB] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col card-hover-lift">
      {/* Product Image Area */}
      <Link href={`/cakes/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-amber-50 block">
        <Image
          src={product.images[0]?.url || "/placeholder-cake.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Bestseller
            </span>
          )}
          {product.isSpecial && (
            <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Chef&apos;s Special
            </span>
          )}
        </div>

        {/* Dietary Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.isEggless ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold border border-emerald-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              100% Eggless
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-amber-900 text-[10px] font-bold border border-amber-300 shadow-sm">
              Contains Egg
            </span>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="text-xs font-bold text-[#221610]">{product.rating}</span>
            <span className="text-xs text-[#786B62]">({product.reviewCount})</span>
            <span className="text-[11px] text-emerald-700 font-medium ml-auto">
              Ready in {product.preparationTime}
            </span>
          </div>

          {/* Title */}
          <Link href={`/cakes/${product.slug}`}>
            <h3 className="font-serif-heading text-base font-bold text-[#221610] group-hover:text-amber-800 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Desc */}
          <p className="text-xs text-[#786B62] line-clamp-2 mt-1 mb-3">
            {product.shortDesc}
          </p>
        </div>

        <div>
          {/* Weight Variants Selector */}
          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(v);
                  }}
                  className={`text-[11px] font-semibold px-2 py-1 rounded-lg border transition-all ${
                    selectedVariant.id === v.id
                      ? "bg-amber-800 text-white border-amber-800 shadow-xs"
                      : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB] hover:border-amber-400"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          {/* Price & Actions */}
          <div className="pt-3 border-t border-[#EBDCCB]/80 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#786B62] block leading-none">Price</span>
              <span className="font-serif-heading text-lg font-bold text-[#221610]">
                {formatINR(selectedVariant.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickAdd}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-700 hover:bg-amber-800 text-white"
                }`}
                aria-label={`Add ${product.name} to basket`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" /> Add
                  </>
                )}
              </button>

              <Link
                href={`/cakes/${product.slug}`}
                className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-amber-100 text-amber-900 border border-[#EBDCCB] transition-colors"
                aria-label={`Customize ${product.name}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
