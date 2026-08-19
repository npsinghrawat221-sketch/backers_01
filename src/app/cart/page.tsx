"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { siteConfig, formatPrice } from "@/config/site";
import { useToast } from "@/context/ToastContext";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    updateMessage,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    deliveryCharge,
    taxAmount,
    totalAmount,
    itemCount,
  } = useCart();

  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    const res = await applyCoupon(couponCode.trim());
    setIsApplyingCoupon(false);

    if (res.success) {
      showToast(res.message, "success");
      setCouponCode("");
    } else {
      showToast(res.message, "error");
    }
  };

  const freeDeliveryThreshold = siteConfig.delivery.freeDeliveryThreshold;
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="py-20 bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xl">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-800">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif-heading text-2xl font-bold text-[#221610] mb-2">
            Your Cake Basket is Empty
          </h1>
          <p className="text-sm text-[#786B62] mb-6">
            Looks like you haven&apos;t added any celebratory cakes or gourmet treats yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cakes"
              className="px-6 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Browse Signature Cakes
            </Link>
            <Link
              href="/custom-cakes"
              className="px-6 py-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-amber-100 text-amber-900 font-bold text-xs border border-[#EBDCCB] transition-colors"
            >
              Custom Cake Studio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
            Your Cake Basket ({itemCount})
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62] mt-1">
            Review your customized bakes, celebration messages, and apply coupon codes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Delivery Meter Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80">
              <div className="flex items-center justify-between text-xs font-semibold mb-2 text-amber-950">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  {amountNeeded === 0 ? (
                    <strong className="text-emerald-700 font-bold">You unlocked FREE Doorstep Delivery! 🎉</strong>
                  ) : (
                    <>Add <strong>{formatPrice(amountNeeded)}</strong> more to get <strong>FREE Express Delivery</strong></>
                  )}
                </span>
                <span>{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="w-full bg-amber-200/80 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Items Cards */}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-start sm:items-center">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-amber-50 shrink-0 border border-[#EBDCCB]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={`/cakes/${item.slug}`}
                      className="font-serif-heading text-base font-bold text-[#221610] hover:text-amber-800 transition-colors"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-[#786B62]">
                      <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-md font-semibold">
                        {item.variantName}
                      </span>
                      {item.eggless && (
                        <span className="text-emerald-700 font-semibold">✓ 100% Eggless</span>
                      )}
                    </div>

                    {/* Cake Message Input */}
                    <div className="pt-1">
                      <input
                        type="text"
                        maxLength={35}
                        value={item.cakeMessage || ""}
                        onChange={(e) => updateMessage(item.id, e.target.value)}
                        placeholder="Message on cake (e.g. Happy Birthday!)"
                        className="bg-[#FAF7F2] border border-[#EBDCCB] px-3 py-1.5 rounded-xl text-xs text-[#221610] placeholder:text-[#786B62] focus:outline-none focus:border-amber-600 w-full sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity & Total Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EBDCCB]">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-[#EBDCCB] rounded-xl bg-[#FAF7F2] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-xs text-[#786B62] hover:text-[#221610] hover:bg-amber-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-[#221610]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-xs text-[#786B62] hover:text-[#221610] hover:bg-amber-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="font-serif-heading text-base font-bold text-[#221610] min-w-[70px] text-right">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#786B62] hover:text-rose-600 transition-colors rounded-xl hover:bg-rose-50"
                    aria-label="Remove cake from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Checkout (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-lg space-y-5">
              <h2 className="font-serif-heading text-lg font-bold text-[#221610]">
                Order Summary
              </h2>

              {/* Coupon Code Section */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <div className="font-bold text-xs text-emerald-900 font-mono">
                          {appliedCoupon.code}
                        </div>
                        <div className="text-[10px] text-emerald-700">
                          Discount Applied ({formatPrice(discountAmount)} OFF)
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-rose-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon (e.g. WELCOME10)"
                      className="flex-1 bg-[#FAF7F2] border border-[#EBDCCB] px-3 py-2 rounded-xl text-xs text-[#221610] font-mono focus:outline-none focus:border-amber-600"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon}
                      className="px-4 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs hover:bg-amber-900 transition-colors disabled:opacity-50"
                    >
                      {isApplyingCoupon ? "..." : "Apply"}
                    </button>
                  </form>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-[#786B62]">Try:</span>
                  <button
                    type="button"
                    onClick={() => setCouponCode("WELCOME10")}
                    className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono"
                  >
                    WELCOME10
                  </button>
                  <button
                    type="button"
                    onClick={() => setCouponCode("FLAT100")}
                    className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono"
                  >
                    FLAT100
                  </button>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#EBDCCB] text-xs sm:text-sm">
                <div className="flex justify-between text-[#786B62]">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-[#221610]">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#786B62]">
                  <span>Doorstep Delivery</span>
                  <span className="font-semibold text-[#221610]">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
                    ) : (
                      formatPrice(deliveryCharge)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[#786B62]">
                  <span>GST &amp; Taxes (5%)</span>
                  <span className="font-semibold text-[#221610]">{formatPrice(taxAmount)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#221610] pt-3 border-t border-[#EBDCCB]">
                  <span>Grand Total</span>
                  <span className="font-serif-heading text-xl text-amber-900">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Action */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
