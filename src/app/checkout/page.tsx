"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Loader2,
  Lock,
} from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { siteConfig, formatPrice } from "@/config/site";
import { useToast } from "@/context/ToastContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, deliveryCharge, taxAmount, totalAmount, clearCart } =
    useCart();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Greater Noida");
  const [postalCode, setPostalCode] = useState("201310");
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deliverySlot, setDeliverySlot] = useState(
    siteConfig.delivery.deliveryTimeSlots[1]?.label || "Afternoon Slot"
  );
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="py-20 bg-[#FAF7F2] min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-lg">
          <h2 className="font-serif-heading text-xl font-bold text-[#221610] mb-2">
            No items in basket
          </h2>
          <p className="text-xs text-[#786B62] mb-4">
            Please add your favorite cakes to proceed with checkout.
          </p>
          <Link
            href="/cakes"
            className="px-6 py-2.5 rounded-xl bg-amber-700 text-white font-bold text-xs"
          >
            Browse Cakes
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      showToast("Please fill in customer name and phone number", "error");
      return;
    }

    if (deliveryType === "DELIVERY" && !address.trim()) {
      showToast("Please enter complete delivery address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. If Razorpay is chosen, initiate payment endpoint
      let razorpayOrderId = null;
      let razorpayPaymentId = null;

      if (paymentMethod === "RAZORPAY") {
        const paymentRes = await fetch("/api/payments/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount,
            currency: "INR",
          }),
        });
        const paymentData = await paymentRes.json();
        if (paymentData.success) {
          razorpayOrderId = paymentData.orderId;
          razorpayPaymentId = `pay_mock_${Date.now()}`;
        }
      }

      // 2. Submit order to backend
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail: customerEmail.trim() || undefined,
          customerPhone,
          deliveryType,
          address: deliveryType === "DELIVERY" ? address : "Store Pickup - Purvanchal Silver City II, Pi-2, Greater Noida",
          landmark,
          city,
          postalCode,
          deliveryDate,
          deliverySlot,
          orderNotes,
          subtotal,
          discount: discountAmount,
          deliveryCharge,
          tax: taxAmount,
          total: totalAmount,
          paymentMethod,
          paymentStatus: paymentMethod === "RAZORPAY" ? "PAID" : "PENDING",
          razorpayOrderId,
          razorpayPaymentId,
          items,
        }),
      });

      const data = await res.json();

      if (data.success && data.order) {
        clearCart();
        showToast("Order placed successfully! 🎉", "success");
        router.push(`/order-success/${data.order.orderNumber}`);
      } else {
        showToast(data.error || "Failed to place order", "error");
      }
    } catch (err) {
      console.error("Order submission error:", err);
      showToast("Error processing order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
            Checkout &amp; Delivery Details
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62] mt-1">
            Complete your recipient details, select time slot, and confirm payment.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Details (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. Customer Details */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-4">
                <h2 className="font-serif-heading text-lg font-bold text-[#221610] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  Recipient Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                      Phone Number (For Delivery Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                    Email Address (For PDF Invoice &amp; Tracking)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. priya@example.com"
                    className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* 2. Delivery Options & Address */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-4">
                <h2 className="font-serif-heading text-lg font-bold text-[#221610] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  Delivery Method &amp; Schedule
                </h2>

                {/* Delivery vs Pickup switch */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("DELIVERY")}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      deliveryType === "DELIVERY"
                        ? "bg-amber-800 text-white border-amber-800 shadow-md"
                        : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB]"
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    Doorstep Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("PICKUP")}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      deliveryType === "PICKUP"
                        ? "bg-amber-800 text-white border-amber-800 shadow-md"
                        : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB]"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    Studio Pickup (Purvanchal Silver City II)
                  </button>
                </div>

                {deliveryType === "DELIVERY" && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                        Complete Delivery Address *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Flat No., Apartment Name, Street (e.g. 12th Main Road)"
                        className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#221610] mb-1">
                          Landmark
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="e.g. Near Wipro Park"
                          className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3.5 py-2.5 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#221610] mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={city}
                          className="w-full bg-stone-100 border border-[#EBDCCB] px-3.5 py-2.5 rounded-xl text-xs text-[#221610] cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#221610] mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="201310"
                          className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3.5 py-2.5 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Schedule Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" /> Delivery Date *
                    </label>
                    <input
                      type="date"
                      suppressHydrationWarning
                      min={new Date().toISOString().split("T")[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" /> Time Slot *
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-medium"
                    >
                      {siteConfig.delivery.deliveryTimeSlots.map((slot) => (
                        <option key={slot.id} value={slot.label}>
                          {slot.label} ({slot.time})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                    Order Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Ring bell, handle gently, call on arrival"
                    className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-2xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-4">
                <h2 className="font-serif-heading text-lg font-bold text-[#221610] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  Select Payment Option
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Razorpay Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("RAZORPAY")}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      paymentMethod === "RAZORPAY"
                        ? "bg-amber-50 border-amber-800 ring-2 ring-amber-300 shadow-md"
                        : "bg-[#FAF7F2] border-[#EBDCCB] hover:border-amber-400"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#221610]">
                        Online Payment (Razorpay)
                      </div>
                      <div className="text-[11px] text-[#786B62] mt-0.5">
                        UPI, Google Pay, Cards, NetBanking
                      </div>
                      <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Fast &amp; Secure 100% Encrypted
                      </span>
                    </div>
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      paymentMethod === "COD"
                        ? "bg-amber-50 border-amber-800 ring-2 ring-amber-300 shadow-md"
                        : "bg-[#FAF7F2] border-[#EBDCCB] hover:border-amber-400"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#221610]">
                        Cash on Delivery / Pickup
                      </div>
                      <div className="text-[11px] text-[#786B62] mt-0.5">
                        Pay via Cash or UPI when your cake arrives
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order Button (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xl space-y-5">
                <h2 className="font-serif-heading text-lg font-bold text-[#221610]">
                  Order Items ({items.length})
                </h2>

                {/* Compact Item List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-[#EBDCCB]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#221610] truncate">{item.name}</div>
                        <div className="text-[#786B62]">
                          {item.variantName} × {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-[#221610]">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t border-[#EBDCCB] text-xs sm:text-sm">
                  <div className="flex justify-between text-[#786B62]">
                    <span>Item Subtotal</span>
                    <span className="font-semibold text-[#221610]">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#786B62]">
                    <span>Delivery Charges</span>
                    <span className="font-semibold text-[#221610]">
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
                      ) : (
                        formatPrice(deliveryCharge)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#786B62]">
                    <span>GST (5%)</span>
                    <span className="font-semibold text-[#221610]">{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#221610] pt-3 border-t border-[#EBDCCB]">
                    <span>Grand Total</span>
                    <span className="font-serif-heading text-2xl text-amber-900">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Celebration Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Order ({formatPrice(totalAmount)})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#786B62] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Satisfaction guaranteed. Baked fresh with love.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
