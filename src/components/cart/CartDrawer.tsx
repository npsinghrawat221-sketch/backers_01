"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { siteConfig, formatPrice } from "@/config/site";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    deliveryCharge,
    totalAmount,
    appliedCoupon,
    itemCount,
  } = useCart();

  const freeDeliveryThreshold = siteConfig.delivery.freeDeliveryThreshold;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#EBDCCB] transform transition-transform duration-300 ease-out">
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-[#EBDCCB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h2 className="font-serif-heading text-xl font-bold text-[#221610]">
                Your Cake Basket ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full hover:bg-amber-100/60 text-[#786B62] hover:text-[#221610] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter Banner */}
          <div className="bg-amber-50 px-6 py-3 border-b border-amber-200/80">
            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-amber-950">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {amountNeededForFreeDelivery === 0 ? (
                  <strong className="text-emerald-700">You unlocked FREE Delivery! 🎉</strong>
                ) : (
                  <>Add <strong>{formatPrice(amountNeededForFreeDelivery)}</strong> for FREE Delivery</>
                )}
              </span>
              <span>{Math.round(freeDeliveryProgress)}%</span>
            </div>
            <div className="w-full bg-amber-200/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-heading text-lg font-bold text-[#221610]">
                    Your basket is empty
                  </h3>
                  <p className="text-xs text-[#786B62] max-w-xs">
                    Explore our artisanal eggless cakes, cupcakes, and celebration bakes.
                  </p>
                </div>
                <Link
                  href="/cakes"
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  Browse Signature Cakes
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#EBDCCB] shadow-2xs flex gap-3.5 items-center relative"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-[#EBDCCB]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-heading font-bold text-sm text-[#221610] truncate">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#786B62]">
                      <span className="font-semibold text-amber-900 bg-amber-100/80 px-1.5 py-0.5 rounded text-[10px]">
                        {item.variantName}
                      </span>
                      {item.eggless && (
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          Eggless
                        </span>
                      )}
                    </div>

                    {item.cakeMessage && (
                      <p className="text-[11px] text-[#786B62] italic truncate mt-0.5">
                        &quot;{item.cakeMessage}&quot;
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif-heading font-bold text-sm text-[#221610]">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#EBDCCB] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-[#786B62] hover:text-[#221610] hover:bg-amber-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-[#221610]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-[#786B62] hover:text-[#221610] hover:bg-amber-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-1 rounded-lg text-[#786B62] hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EBDCCB] space-y-4">
              <div className="space-y-1.5 text-xs text-[#786B62]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#221610]">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-[#221610]">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                    ) : (
                      formatPrice(deliveryCharge)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#221610] pt-2 border-t border-[#EBDCCB]">
                  <span>Total Amount</span>
                  <span className="font-serif-heading text-lg text-amber-900">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="py-3 px-4 rounded-xl border border-amber-800/40 text-amber-900 font-bold text-xs hover:bg-amber-50 text-center transition-colors"
                >
                  View Full Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
