"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, Check, Heart, ChefHat, ArrowRight } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/config/site";

export interface MenuCakeItem {
  id: number;
  slug: string;
  name: string;
  halfKgPrice: number;
  oneKgPrice: number;
  popular?: boolean;
}

export const menuCakes: MenuCakeItem[] = [
  { id: 1, slug: "ice-cream-cake", name: "ICE CREAM CAKE", halfKgPrice: 650, oneKgPrice: 1300, popular: true },
  { id: 2, slug: "vanilla-cake", name: "VANILLA CAKE", halfKgPrice: 450, oneKgPrice: 900 },
  { id: 3, slug: "strawberry-cake", name: "STRAWBERRY CAKE", halfKgPrice: 480, oneKgPrice: 960 },
  { id: 4, slug: "blueberry-cake", name: "BLUEBERRY CAKE", halfKgPrice: 480, oneKgPrice: 960 },
  { id: 5, slug: "pineapple-cake", name: "PINEAPPLE CAKE", halfKgPrice: 500, oneKgPrice: 1000, popular: true },
  { id: 6, slug: "butterscotch-cake", name: "BUTTERSCOTCH CAKE", halfKgPrice: 500, oneKgPrice: 1000, popular: true },
  { id: 7, slug: "fruit-mango-cake", name: "FRUIT MANGO CAKE", halfKgPrice: 550, oneKgPrice: 1100 },
  { id: 8, slug: "fresh-mixed-fruit-cake", name: "FRUIT CAKE", halfKgPrice: 600, oneKgPrice: 1200, popular: true },
  { id: 9, slug: "chocolate-cake", name: "CHOCOLATE CAKE", halfKgPrice: 550, oneKgPrice: 1100 },
  { id: 10, slug: "red-velvet-cake", name: "RED VELVET", halfKgPrice: 550, oneKgPrice: 1100, popular: true },
  { id: 11, slug: "black-forest-cake", name: "BLACK FOREST CAKE", halfKgPrice: 600, oneKgPrice: 1200 },
  { id: 12, slug: "truffle-cake", name: "TRUFFLE CAKE", halfKgPrice: 700, oneKgPrice: 1400, popular: true },
  { id: 13, slug: "lotus-biscoff-cake", name: "BISCOFF CAKE", halfKgPrice: 850, oneKgPrice: 1700, popular: true },
  { id: 14, slug: "chocolate-walnut-cake", name: "CHOCOLATE WALNUT CAKE", halfKgPrice: 650, oneKgPrice: 1300 },
];

export default function MenuPage() {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  const handleOrder = (cake: MenuCakeItem, weight: "0.5kg" | "1.0kg", price: number) => {
    const key = `${cake.id}-${weight}`;
    
    addItem({
      productId: `prod-${cake.id}`,
      slug: cake.slug,
      name: `${cake.name.toUpperCase()} (${weight === "0.5kg" ? "0.5 kg" : "1.0 kg"})`,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
      variantName: weight === "0.5kg" ? "0.5 kg" : "1.0 kg",
      weightKg: weight === "0.5kg" ? 0.5 : 1.0,
      unitPrice: price,
      quantity: 1,
      eggless: true,
    });

    setAddedItemKey(key);
    setTimeout(() => setAddedItemKey(null), 1500);

    showToast(`Added ${cake.name} (${weight === "0.5kg" ? "500g" : "1kg"}) to your order!`, "success");
    openDrawer();
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Menu Card Container */}
        <div className="bg-[#FFF8F8] border-4 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Decorative Background Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-100/50 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-100/50 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          {/* Header Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex flex-col items-center justify-center bg-white border-2 border-pink-300 rounded-full px-8 py-4 shadow-sm mb-4">
              <div className="flex items-center gap-2 text-pink-600 font-bold text-lg sm:text-xl tracking-wide uppercase">
                <ChefHat className="w-6 h-6 text-pink-500" />
                <span>Honey Bunny Bakers</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-amber-900 tracking-widest uppercase">
                Established in 2018
              </span>
            </div>

            <p className="text-pink-600 font-serif italic text-lg sm:text-xl font-medium flex items-center justify-center gap-2">
              <span>🌸</span> Eggless delight in every bite <span>🌸</span>
            </p>
          </div>

          {/* Banner Title */}
          <div className="relative mb-8 text-center">
            <div className="inline-block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-2xl sm:text-4xl tracking-widest px-10 py-3 rounded-full shadow-lg uppercase border-2 border-white">
              CAKES
            </div>
          </div>

          {/* Menu Table Header */}
          <div className="grid grid-cols-12 gap-2 bg-pink-100/80 border border-pink-200 rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-extrabold text-pink-900 uppercase tracking-wider mb-4 shadow-inner">
            <div className="col-span-6 sm:col-span-5 flex items-center gap-2">
              <span>CAKE NAME</span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-center">
              <span className="block text-pink-800">HALF KG</span>
              <span className="text-[10px] font-normal text-pink-600">(500G)</span>
            </div>
            <div className="col-span-3 sm:col-span-4 text-center">
              <span className="block text-pink-800">1 KG</span>
              <span className="text-[10px] font-normal text-pink-600">(1000G)</span>
            </div>
          </div>

          {/* Cake Menu Items List */}
          <div className="space-y-2 mb-8">
            {menuCakes.map((cake) => (
              <div
                key={cake.id}
                className="grid grid-cols-12 gap-2 items-center bg-white hover:bg-pink-50/60 border border-pink-100 rounded-xl p-3 transition-all duration-200 shadow-sm"
              >
                {/* Name */}
                <div className="col-span-6 sm:col-span-5 flex items-center gap-2 font-bold text-amber-950 text-xs sm:text-sm">
                  <span className="text-pink-400 text-[11px] font-mono w-5 shrink-0">{cake.id}.</span>
                  <span className="truncate">{cake.name}</span>
                  {cake.popular && (
                    <span className="hidden md:inline-flex items-center gap-1 text-[9px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-extrabold">
                      ⭐ Popular
                    </span>
                  )}
                </div>

                {/* Half KG Button */}
                <div className="col-span-3 sm:col-span-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center">
                  <span className="font-extrabold text-pink-700 text-xs sm:text-sm">
                    {formatPrice(cake.halfKgPrice)}
                  </span>
                  <button
                    onClick={() => handleOrder(cake, "0.5kg", cake.halfKgPrice)}
                    className="w-full sm:w-auto px-2.5 py-1 text-[10px] sm:text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-1"
                  >
                    {addedItemKey === `${cake.id}-0.5kg` ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Order 500g</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 1 KG Button */}
                <div className="col-span-3 sm:col-span-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center">
                  <span className="font-extrabold text-pink-800 text-xs sm:text-sm">
                    {formatPrice(cake.oneKgPrice)}
                  </span>
                  <button
                    onClick={() => handleOrder(cake, "1.0kg", cake.oneKgPrice)}
                    className="w-full sm:w-auto px-2.5 py-1 text-[10px] sm:text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-1"
                  >
                    {addedItemKey === `${cake.id}-1.0kg` ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Order 1kg</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customisation Extra Charges Banner */}
          <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-dashed border-pink-300 rounded-2xl p-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-amber-950 uppercase text-sm sm:text-base tracking-wide">
                  CUSTOMISATION Extra charges
                </h4>
                <p className="text-xs text-amber-800/80">
                  Custom photo plaques, theme decorations, special fondant toppers &amp; custom text messaging.
                </p>
              </div>
            </div>
            <div className="bg-rose-600 text-white font-extrabold text-base sm:text-lg px-6 py-2 rounded-xl shadow-md shrink-0 border border-white">
              + {formatPrice(250)}
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center border-t border-pink-200 pt-6">
            <p className="font-serif italic text-pink-700 text-sm font-semibold flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              Thank you for choosing Honey Bunny Bakers!
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </p>
            <p className="text-[11px] text-amber-900/60 mt-1">
              100% Freshly Baked Eggless Cakes • Doorstep Delivery Available
            </p>
          </div>

        </div>

        {/* Custom Cake Builder CTA Banner */}
        <div className="mt-8 bg-amber-950 text-white rounded-3xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-amber-200 font-serif mb-1">
              Need a Bespoke Tiered Custom Cake?
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
              Upload your reference photo, pick custom flavors, and get an instant quotation for 2-tier or 3-tier celebration cakes!
            </p>
          </div>
          <Link
            href="/custom-cakes"
            className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Create Custom Cake</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
