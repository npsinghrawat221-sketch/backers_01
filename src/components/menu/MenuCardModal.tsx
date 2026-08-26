"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Check, ChefHat, Heart, Sparkles, ArrowRight } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/config/site";
import { menuCakes, MenuCakeItem } from "@/app/menu/page";
import Link from "next/link";

interface MenuCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuCardModal({ isOpen, onClose }: MenuCardModalProps) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  if (!isOpen) return null;

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
    onClose();
    openDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Card Box */}
      <div className="bg-[#FFF8F8] border-4 border-pink-200 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 flex items-center justify-center transition-transform active:scale-95 shadow-md"
          aria-label="Close Menu Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex flex-col items-center justify-center bg-white border-2 border-pink-300 rounded-full px-6 py-3 shadow-sm mb-3">
            <div className="flex items-center gap-2 text-pink-600 font-bold text-base sm:text-lg tracking-wide uppercase">
              <ChefHat className="w-5 h-5 text-pink-500" />
              <span>Honey Bunny Bakers</span>
            </div>
            <span className="text-[10px] font-semibold text-amber-900 tracking-widest uppercase">
              Established in 2018
            </span>
          </div>

          <p className="text-pink-600 font-serif italic text-sm sm:text-base font-medium flex items-center justify-center gap-1.5">
            <span>🌸</span> Eggless delight in every bite <span>🌸</span>
          </p>
        </div>

        {/* Banner Title */}
        <div className="relative mb-6 text-center">
          <div className="inline-block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-xl sm:text-3xl tracking-widest px-8 py-2 rounded-full shadow-md uppercase border-2 border-white">
            CAKES
          </div>
        </div>

        {/* Menu Table Header */}
        <div className="grid grid-cols-12 gap-2 bg-pink-100/80 border border-pink-200 rounded-2xl p-2.5 sm:p-3 text-xs font-extrabold text-pink-900 uppercase tracking-wider mb-3 shadow-inner">
          <div className="col-span-6 sm:col-span-5 flex items-center gap-1">
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
        <div className="space-y-2 mb-6">
          {menuCakes.map((cake) => (
            <div
              key={cake.id}
              className="grid grid-cols-12 gap-2 items-center bg-white hover:bg-pink-50/70 border border-pink-100 rounded-xl p-2.5 transition-all shadow-sm"
            >
              {/* Name */}
              <div className="col-span-6 sm:col-span-5 flex items-center gap-1.5 font-bold text-amber-950 text-xs sm:text-sm">
                <span className="text-pink-400 text-[10px] font-mono w-4 shrink-0">{cake.id}.</span>
                <span className="truncate">{cake.name}</span>
                {cake.popular && (
                  <span className="hidden md:inline-flex items-center gap-0.5 text-[8px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-full font-extrabold">
                    ⭐ Popular
                  </span>
                )}
              </div>

              {/* Half KG Button */}
              <div className="col-span-3 sm:col-span-3 flex flex-col sm:flex-row items-center justify-center gap-1 text-center">
                <span className="font-extrabold text-pink-700 text-xs">
                  {formatPrice(cake.halfKgPrice)}
                </span>
                <button
                  onClick={() => handleOrder(cake, "0.5kg", cake.halfKgPrice)}
                  className="w-full sm:w-auto px-2 py-1 text-[10px] font-bold bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-1"
                >
                  {addedItemKey === `${cake.id}-0.5kg` ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : (
                    <>
                      <ShoppingBag className="w-2.5 h-2.5" />
                      <span>500g</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1 KG Button */}
              <div className="col-span-3 sm:col-span-4 flex flex-col sm:flex-row items-center justify-center gap-1 text-center">
                <span className="font-extrabold text-pink-800 text-xs">
                  {formatPrice(cake.oneKgPrice)}
                </span>
                <button
                  onClick={() => handleOrder(cake, "1.0kg", cake.oneKgPrice)}
                  className="w-full sm:w-auto px-2 py-1 text-[10px] font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-1"
                >
                  {addedItemKey === `${cake.id}-1.0kg` ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : (
                    <>
                      <ShoppingBag className="w-2.5 h-2.5" />
                      <span>1kg</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customisation Extra Charges Banner */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-dashed border-pink-300 rounded-xl p-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-amber-950 uppercase text-xs sm:text-sm tracking-wide">
                CUSTOMISATION Extra charges
              </h4>
              <p className="text-[11px] text-amber-800/80">
                Photo plaques, custom text messaging &amp; theme toppers.
              </p>
            </div>
          </div>
          <div className="bg-rose-600 text-white font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-lg shadow-md shrink-0 border border-white">
            + {formatPrice(250)}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center border-t border-pink-200 pt-4 flex items-center justify-between">
          <p className="font-serif italic text-pink-700 text-xs font-semibold flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            Honey Bunny Bakers
          </p>
          <Link
            href="/custom-cakes"
            onClick={onClose}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 underline flex items-center gap-1"
          >
            <span>Custom Cake Studio</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}
