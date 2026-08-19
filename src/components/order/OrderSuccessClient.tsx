"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Printer,
  MessageCircle,
  Truck,
  ArrowRight,
  Cake,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
} from "@/components/icons";
import { Order } from "@/types/database";
import { siteConfig, getWhatsAppUrl, formatPrice } from "@/config/site";
import { formatDate } from "@/lib/utils";

interface OrderSuccessClientProps {
  order: Order;
}

export function OrderSuccessClient({ order }: OrderSuccessClientProps) {
  useEffect(() => {
    // Dynamic import for confetti if available, otherwise noop
    import("canvas-confetti")
      .then((module) => {
        const confetti = module.default;
        if (typeof confetti === "function") {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#D97706", "#BE123C", "#F59E0B", "#10B981"],
          });
        }
      })
      .catch(() => {
        // graceful fallback if canvas-confetti is not loaded
      });
  }, []);

  const whatsappMessage = `Hello Velvet & Crumb! I just placed cake order *#${order.orderNumber}* for ₹${order.total}.\n\n*Customer:* ${order.customerName}\n*Delivery Date:* ${order.deliveryDate} (${order.deliverySlot})\n*Address:* ${order.address || "Store Pickup"}\n\nCould you please share real-time baking & dispatch status? Thank you!`;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="rounded-3xl bg-white border border-[#EBDCCB] shadow-2xl p-6 sm:p-10 space-y-8 text-center sm:text-left animate-in fade-in zoom-in-95 duration-300">
        {/* Top Success Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#EBDCCB]">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Celebration Order Confirmed! 🎉
            </span>
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#221610] mt-1">
              Thank You, {order.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#786B62] mt-1">
              We have received your order and our pastry team is getting ready to bake.
            </p>
          </div>

          {/* Unique Order ID badge */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] text-center shrink-0">
            <div className="text-[10px] uppercase font-bold text-[#786B62]">Order Number</div>
            <div className="font-mono text-base font-bold text-amber-900">{order.orderNumber}</div>
          </div>
        </div>

        {/* Schedule & Delivery Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] text-xs sm:text-sm">
          <div className="space-y-1">
            <div className="text-[#786B62] font-semibold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-700" /> Delivery Scheduled For:
            </div>
            <div className="font-bold text-[#221610] text-sm sm:text-base">
              {formatDate(order.deliveryDate)}
            </div>
            <div className="text-amber-800 font-semibold">{order.deliverySlot}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[#786B62] font-semibold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-700" /> Delivery Address:
            </div>
            <div className="font-bold text-[#221610]">
              {order.address || "Store Pickup (Purvanchal Silver City II, Pi-2, Greater Noida)"}
            </div>
            {order.landmark && (
              <div className="text-xs text-[#786B62]">Landmark: {order.landmark}</div>
            )}
          </div>
        </div>

        {/* Ordered Items Breakdown */}
        <div className="space-y-3">
          <h3 className="font-serif-heading text-base font-bold text-[#221610]">
            Order Items
          </h3>

          <div className="space-y-2.5">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#EBDCCB] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#221610]">
                    {item.variantName ? `${item.variantName}` : "Cake"} × {item.quantity}
                  </div>
                  {item.eggless && (
                    <span className="text-[10px] font-semibold text-emerald-700">
                      ✓ 100% Eggless
                    </span>
                  )}
                  {item.cakeMessage && (
                    <div className="text-xs text-amber-900/80 italic mt-0.5">
                      Plaque: &quot;{item.cakeMessage}&quot;
                    </div>
                  )}
                </div>
                <div className="font-bold text-sm text-[#221610]">
                  {formatPrice(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-5 rounded-2xl bg-white border border-[#EBDCCB] space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between text-[#786B62]">
            <span>Subtotal</span>
            <span className="font-semibold text-[#221610]">{formatPrice(order.subtotal)}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Promotional Discount</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-[#786B62]">
            <span>Delivery Fee</span>
            <span className="font-semibold text-[#221610]">
              {order.deliveryCharge === 0 ? "FREE" : formatPrice(order.deliveryCharge)}
            </span>
          </div>

          <div className="flex justify-between text-[#786B62]">
            <span>GST Taxes (5%)</span>
            <span className="font-semibold text-[#221610]">{formatPrice(order.tax)}</span>
          </div>

          <div className="flex justify-between text-base font-bold text-[#221610] pt-2 border-t border-[#EBDCCB]">
            <span>Total Paid ({order.paymentMethod})</span>
            <span className="font-serif-heading text-xl text-amber-900">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            href={`/track-order?orderId=${order.orderNumber}&phone=${order.customerPhone}`}
            className="py-3.5 px-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Status</span>
          </Link>

          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order Updates on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="py-3.5 px-4 rounded-2xl bg-[#FAF7F2] hover:bg-amber-100 text-[#221610] font-bold text-xs border border-[#EBDCCB] transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
