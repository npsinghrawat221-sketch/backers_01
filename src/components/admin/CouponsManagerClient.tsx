"use client";

import React, { useState } from "react";
import { Coupon } from "@/types/database";
import { useToast } from "@/context/ToastContext";
import { Tag, Plus, CheckCircle2, X } from "@/components/icons";
import { formatINR } from "@/lib/utils";

interface CouponsManagerClientProps {
  initialCoupons: Coupon[];
}

export function CouponsManagerClient({ initialCoupons }: CouponsManagerClientProps) {
  const { showToast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("10");
  const [minOrderAmount, setMinOrderAmount] = useState("499");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: parseFloat(discountValue),
      minOrderAmount: parseFloat(minOrderAmount) || 0,
      isActive: true,
      usageCount: 0,
    };

    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    setCode("");
    showToast(`Coupon "${newCoupon.code}" created!`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Promotions &amp; Discounts
          </span>
          <h1 className="font-serif-heading text-3xl font-extrabold text-[#221610] tracking-tight">
            Coupons &amp; Offers
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62] mt-1">
            Create and manage promotional discount codes for customer checkouts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-base font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                {coupon.code}
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Active
              </span>
            </div>

            <div className="space-y-1 text-xs text-[#786B62]">
              <div>
                Discount:{" "}
                <strong className="text-[#221610]">
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}% OFF`
                    : formatINR(coupon.discountValue)}
                </strong>
              </div>
              <div>
                Min Order Spend:{" "}
                <strong className="text-[#221610]">{formatINR(coupon.minOrderAmount)}</strong>
              </div>
              <div>
                Redemptions:{" "}
                <strong className="text-[#221610]">{coupon.usageCount || 0} times</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-[#EBDCCB] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBDCCB]">
              <h3 className="font-serif-heading text-lg font-bold text-[#221610]">
                Create Promo Coupon
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#786B62]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-[#221610] mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FESTIVE20"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#221610] font-bold uppercase focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#221610] mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3 py-2 rounded-xl text-xs font-semibold"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Flat (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#221610] mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="15"
                    className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3.5 py-2 rounded-xl text-xs text-[#221610] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#221610] mb-1">
                  Minimum Order Spend (₹)
                </label>
                <input
                  type="number"
                  value={minOrderAmount}
                  onChange={(e) => setMinOrderAmount(e.target.value)}
                  placeholder="499"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3.5 py-2 rounded-xl text-xs text-[#221610]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#786B62]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-700 text-white font-bold text-xs shadow-md"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
