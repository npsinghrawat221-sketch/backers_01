"use client";

import React, { useState } from "react";
import { Order } from "@/types/database";
import { formatINR, formatDate } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Eye,
  X,
  Printer,
  ChevronRight,
  Phone,
  Calendar,
  MapPin,
} from "@/components/icons";
import { formatPrice } from "@/config/site";

interface OrdersManagerClientProps {
  initialOrders: Order[];
}

const STATUS_OPTIONS = [
  "PLACED",
  "PAYMENT_CONFIRMED",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

export function OrdersManagerClient({ initialOrders }: OrdersManagerClientProps) {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        showToast(`Order status updated to "${newStatus}"`, "success");
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleUpdatePayment = async (orderId: string, newPaymentStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        showToast(`Payment status updated to "${newPaymentStatus}"`, "success");
      }
    } catch {
      showToast("Failed to update payment status", "error");
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeFilter !== "ALL" && order.status !== activeFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Bakery Operations
        </span>
        <h1 className="font-serif-heading text-3xl font-extrabold text-[#221610] tracking-tight">
          Orders Management
        </h1>
        <p className="text-xs sm:text-sm text-[#786B62] mt-1">
          Track real-time bakery orders, change preparation stages, and generate packing slips.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {["ALL", "PLACED", "ACCEPTED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === st
                    ? "bg-amber-800 text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#221610] hover:bg-amber-50"
                }`}
              >
                {st.replace(/_/g, " ")}
              </button>
            )
          )}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#786B62] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Name, Phone..."
            className="w-full bg-[#FAF7F2] border border-[#EBDCCB] pl-9 pr-4 py-2 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#EBDCCB] text-[#786B62] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Order Number</th>
                <th className="py-3 px-3">Customer Info</th>
                <th className="py-3 px-3">Delivery Schedule</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Order Stage</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBDCCB]/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-sm text-[#786B62]">
                    No orders matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-900">
                      {order.orderNumber}
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#221610]">{order.customerName}</div>
                      <div className="text-[11px] text-[#786B62]">{order.customerPhone}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-medium text-[#221610]">{formatDate(order.deliveryDate)}</div>
                      <div className="text-[11px] text-amber-800 font-semibold">{order.deliverySlot}</div>
                    </td>

                    <td className="py-3.5 px-3 font-bold text-[#221610]">
                      {formatINR(order.total)}
                    </td>

                    <td className="py-3.5 px-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="bg-[#FAF7F2] border border-[#EBDCCB] px-2.5 py-1 rounded-xl text-xs font-bold text-amber-950 focus:outline-none focus:border-amber-600"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.paymentStatus === "PAID"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.paymentStatus} ({order.paymentMethod})
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#EBDCCB] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBDCCB]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#786B62]">Order Details</span>
                <h3 className="font-mono text-xl font-bold text-amber-900">
                  {selectedOrder.orderNumber}
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-amber-50 text-[#786B62]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
              <div>
                <span className="text-xs text-[#786B62] block">Current Stage</span>
                <span className="font-bold text-sm text-[#221610]">
                  {selectedOrder.status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedOrder.status === "PLACED" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, "ACCEPTED")}
                    className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold"
                  >
                    Accept Order
                  </button>
                )}
                {selectedOrder.status === "ACCEPTED" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, "PREPARING")}
                    className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold"
                  >
                    Start Baking
                  </button>
                )}
                {selectedOrder.status === "PREPARING" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, "READY")}
                    className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold"
                  >
                    Mark Ready &amp; Packed
                  </button>
                )}
                {selectedOrder.status === "READY" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, "OUT_FOR_DELIVERY")}
                    className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold"
                  >
                    Dispatch for Delivery
                  </button>
                )}
                {selectedOrder.status === "OUT_FOR_DELIVERY" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, "DELIVERED")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    Mark Delivered ✓
                  </button>
                )}
              </div>
            </div>

            {/* Customer & Delivery Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-white border border-[#EBDCCB] space-y-1">
                <span className="font-bold text-[#221610] block mb-1">Customer Info</span>
                <div>Name: <strong>{selectedOrder.customerName}</strong></div>
                <div>Phone: <strong>{selectedOrder.customerPhone}</strong></div>
                <div>Email: {selectedOrder.customerEmail}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EBDCCB] space-y-1">
                <span className="font-bold text-[#221610] block mb-1">Delivery Info</span>
                <div>Date: <strong>{formatDate(selectedOrder.deliveryDate)}</strong></div>
                <div>Slot: <strong>{selectedOrder.deliverySlot}</strong></div>
                <div>Address: {selectedOrder.address || "Store Pickup"}</div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#221610]">Items</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EBDCCB] flex justify-between items-center text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#221610]">{item.variantName || "Cake"}</span> × {item.quantity}
                      {item.eggless && <span className="text-emerald-700 ml-2 font-semibold">✓ Eggless</span>}
                      {item.cakeMessage && (
                        <div className="text-amber-900 italic mt-0.5">Plaque: &quot;{item.cakeMessage}&quot;</div>
                      )}
                    </div>
                    <div className="font-bold text-[#221610]">{formatINR(item.totalPrice)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#EBDCCB] flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-amber-100 text-[#221610] font-bold text-xs border border-[#EBDCCB] flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Packing Slip
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
