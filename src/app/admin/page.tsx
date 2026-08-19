import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  ShoppingBag,
  Sparkles,
  DollarSign,
  Clock,
  ArrowRight,
  Cake,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "@/components/icons";
import { formatINR, formatDate } from "@/lib/utils";

export const revalidate = 0; // dynamic fresh data for admin

export default async function AdminDashboardPage() {
  const [orders, inquiries, products] = await Promise.all([
    db.order.findMany(),
    db.customCakeRequest.findMany(),
    db.product.findMany(),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(
    (o) => o.status === "PLACED" || o.status === "PREPARING" || o.status === "ACCEPTED"
  );
  const pendingInquiries = inquiries.filter(
    (i) => i.status === "PENDING" || i.status === "REVIEWING"
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Executive Overview
        </span>
        <h1 className="font-serif-heading text-3xl font-extrabold text-[#221610] tracking-tight">
          Bakery Control Center
        </h1>
        <p className="text-xs sm:text-sm text-[#786B62] mt-1">
          Real-time metrics, active oven queues, and customer custom cake requests.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#786B62]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#221610]">
            {formatINR(totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>↑ {orders.length} total completed orders</span>
          </div>
        </div>

        {/* Active In-Progress Orders */}
        <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#786B62]">
            <span className="text-xs font-bold uppercase tracking-wider">Active Oven Queue</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#221610]">
            {pendingOrders.length}
          </div>
          <div className="text-[11px] text-rose-700 font-semibold">
            <span>Needs baking / dispatch</span>
          </div>
        </div>

        {/* Custom Cake Inquiries */}
        <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#786B62]">
            <span className="text-xs font-bold uppercase tracking-wider">Custom Requests</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#221610]">
            {pendingInquiries.length}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold">
            <span>Awaiting price quotation</span>
          </div>
        </div>

        {/* Products in Catalog */}
        <div className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#786B62]">
            <span className="text-xs font-bold uppercase tracking-wider">Catalog Bakes</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Cake className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#221610]">
            {products.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            <span>All active on menu</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-heading text-xl font-bold text-[#221610]">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-[#786B62]">Real-time orders received from online storefront</p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#EBDCCB] text-[#786B62] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Delivery Date</th>
                <th className="py-3 px-2">Total</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBDCCB]/60">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF7F2]/60">
                  <td className="py-3.5 px-2 font-mono font-bold text-amber-900">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 px-2">
                    <div className="font-bold text-[#221610]">{order.customerName}</div>
                    <div className="text-[11px] text-[#786B62]">{order.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-2">
                    <div className="font-medium text-[#221610]">{formatDate(order.deliveryDate)}</div>
                    <div className="text-[11px] text-[#786B62]">{order.deliverySlot}</div>
                  </td>
                  <td className="py-3.5 px-2 font-bold text-[#221610]">
                    {formatINR(order.total)}
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Custom Cake Inquiries Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-heading text-xl font-bold text-[#221610]">
              Pending Custom Cake Inquiries
            </h2>
            <p className="text-xs text-[#786B62]">Customer uploaded reference photos and requested quotes</p>
          </div>

          <Link
            href="/admin/custom-cakes"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Review Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inquiries.slice(0, 4).map((inq) => (
            <div
              key={inq.id}
              className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-amber-900">
                    {inq.inquiryNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 text-[10px] font-bold">
                    {inq.status}
                  </span>
                </div>

                <div className="font-bold text-sm text-[#221610] mt-1">
                  {inq.occasion} • {inq.tierSizeKg}
                </div>
                <div className="text-xs text-[#786B62]">
                  Flavor: <strong className="text-[#221610]">{inq.flavor}</strong>
                </div>
                <div className="text-xs text-[#786B62]">
                  Customer: {inq.customerName} ({inq.customerPhone})
                </div>
              </div>

              <Link
                href="/admin/custom-cakes"
                className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Send Quote
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
