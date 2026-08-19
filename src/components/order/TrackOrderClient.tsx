"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Cake,
  PackageCheck,
  ShieldCheck,
  MessageCircle,
  PhoneCall,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "@/components/icons";
import { Order } from "@/types/database";
import { siteConfig, getWhatsAppUrl, formatPrice } from "@/config/site";
import { formatDate } from "@/lib/utils";

const ORDER_STEPS = [
  { key: "PLACED", label: "Order Placed", desc: "Order details received by bakery", icon: CheckCircle2 },
  { key: "PAYMENT_CONFIRMED", label: "Payment Confirmed", desc: "Payment verified successfully", icon: ShieldCheck },
  { key: "ACCEPTED", label: "Order Accepted", desc: "Chef reviewed & scheduled", icon: Cake },
  { key: "PREPARING", label: "Baking & Decorating", desc: "Crafting in patisserie kitchen", icon: Clock },
  { key: "READY", label: "Quality Checked & Packaged", desc: "Packed in chilled luxury box", icon: PackageCheck },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", desc: "En route with express driver", icon: Truck },
  { key: "DELIVERED", label: "Delivered & Celebrated", desc: "Enjoy your sweet milestone!", icon: CheckCircle2 },
];

export function TrackOrderClient() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";
  const initialPhone = searchParams.get("phone") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOrder = async (searchOrderNum: string, searchPhone?: string) => {
    if (!searchOrderNum.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const url = `/api/orders/${encodeURIComponent(searchOrderNum.trim())}${
        searchPhone ? `?phone=${encodeURIComponent(searchPhone.trim())}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setOrder(null);
        setErrorMessage(data.error || "Order not found. Please check your Order ID and phone.");
      }
    } catch {
      setErrorMessage("Error fetching order status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      fetchOrder(initialOrderId, initialPhone);
    }
  }, [initialOrderId, initialPhone]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderNumber, phone);
  };

  const getStepIndex = (status: string) => {
    const idx = ORDER_STEPS.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search Input Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-lg">
        <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-[#221610] mb-2">
          Track Your Live Cake Delivery
        </h2>
        <p className="text-xs sm:text-sm text-[#786B62] mb-6">
          Enter your unique Bakery Order ID (e.g. <span className="font-mono font-bold text-amber-800">BAK-2026-00101</span>) to check real-time baking and dispatch status.
        </p>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Order ID (e.g. BAK-2026-00101)"
              className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] font-mono focus:outline-none focus:border-amber-600 font-bold"
            />
          </div>

          <div className="sm:col-span-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number (Optional)"
              className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-full min-h-[46px] rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Track</span>
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Order Status Timeline View */}
      {order && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EBDCCB] shadow-xl space-y-8">
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EBDCCB]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-lg text-amber-900">
                  {order.orderNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold">
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-xs text-[#786B62] mt-1">
                Recipient: <strong className="text-[#221610]">{order.customerName}</strong> ({order.customerPhone})
              </p>
            </div>

            <button
              onClick={() => fetchOrder(order.orderNumber, order.customerPhone)}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-1.5 border border-[#EBDCCB] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Timeline Visual Steps */}
          <div className="space-y-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#221610]">
              Progress Milestone
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-amber-200 ml-3 sm:ml-4">
              {ORDER_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="relative">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        isPassed
                          ? "bg-amber-700 border-amber-700 text-white shadow-md"
                          : "bg-white border-[#EBDCCB] text-[#B8AAA0]"
                      } ${isCurrent ? "ring-4 ring-amber-200 animate-pulse" : ""}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-0.5">
                      <h4
                        className={`text-sm font-bold ${
                          isPassed ? "text-[#221610]" : "text-[#B8AAA0]"
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-xs text-[#786B62]">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details & Delivery Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-[#786B62] font-semibold">Delivery Date &amp; Slot:</span>
              <div className="font-bold text-[#221610]">{formatDate(order.deliveryDate)}</div>
              <div className="text-amber-800 font-semibold">{order.deliverySlot}</div>
            </div>

            <div className="space-y-1">
              <span className="text-[#786B62] font-semibold">Delivery Address:</span>
              <div className="font-bold text-[#221610]">{order.address || "Store Pickup (Purvanchal Silver City II, Pi-2)"}</div>
              {order.orderNotes && (
                <div className="text-xs text-[#786B62] italic">Note: &quot;{order.orderNotes}&quot;</div>
              )}
            </div>
          </div>

          {/* Action Support Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={getWhatsAppUrl(`Hi Honey Bunny Bakers! I'm inquiring about the real-time baking & delivery status of Order #${order.orderNumber}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Delivery Support</span>
            </a>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#FAF7F2] hover:bg-amber-100 text-amber-900 border border-[#EBDCCB] font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span>Call Bakery Studio ({siteConfig.contact.phoneFormatted})</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
