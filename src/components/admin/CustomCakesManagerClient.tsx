"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomCakeRequest } from "@/types/database";
import { formatINR, formatDate } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { getWhatsAppUrl } from "@/config/site";
import { generateQuotationReplyWhatsAppLink } from "@/lib/whatsapp";
import {
  Sparkles,
  MessageCircle,
  Eye,
  X,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Search,
  Upload,
  Send,
} from "@/components/icons";

interface CustomCakesManagerClientProps {
  initialInquiries: CustomCakeRequest[];
}

const INQUIRY_STATUSES = [
  "PENDING",
  "REVIEWING",
  "QUOTATION_SENT",
  "CUSTOMER_APPROVED",
  "PREPARING",
  "READY",
  "DELIVERED",
  "REJECTED",
];

export function CustomCakesManagerClient({
  initialInquiries,
}: CustomCakesManagerClientProps) {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState<CustomCakeRequest[]>(initialInquiries);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<CustomCakeRequest | null>(null);

  const [quotePrice, setQuotePrice] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenDetail = (inq: CustomCakeRequest) => {
    setSelectedInquiry(inq);
    setQuotePrice(inq.quotationPrice ? inq.quotationPrice.toString() : "");
    setAdminNotes(inq.adminNotes || "");
  };

  const handleSaveQuotation = async (newStatus?: string) => {
    if (!selectedInquiry) return;

    setIsUpdating(true);
    try {
      const priceNum = quotePrice ? parseFloat(quotePrice) : null;
      const statusToSet = newStatus || (priceNum ? "QUOTATION_SENT" : selectedInquiry.status);

      const res = await fetch(`/api/custom-cakes/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quotationPrice: priceNum,
          adminNotes: adminNotes.trim() || null,
          status: statusToSet,
        }),
      });

      const data = await res.json();
      if (data.success && data.inquiry) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === selectedInquiry.id ? data.inquiry : i))
        );
        setSelectedInquiry(data.inquiry);
        showToast("Custom cake quotation updated successfully!", "success");
      }
    } catch {
      showToast("Error updating quotation", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const filtered = inquiries.filter((inq) => {
    if (activeFilter !== "ALL" && inq.status !== activeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Cake Artistry Studio
        </span>
        <h1 className="font-serif-heading text-3xl font-extrabold text-[#221610] tracking-tight">
          Custom Cake Inquiries &amp; Quotations
        </h1>
        <p className="text-xs sm:text-sm text-[#786B62] mt-1">
          Review customer uploaded designs, calculate custom tier pricing, and send WhatsApp quotes.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="p-4 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        {["ALL", "PENDING", "REVIEWING", "QUOTATION_SENT", "CUSTOMER_APPROVED", "PREPARING", "READY", "DELIVERED"].map(
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

      {/* Inquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-[#EBDCCB] p-8">
            <p className="text-sm text-[#786B62]">No custom cake inquiries in this status category.</p>
          </div>
        ) : (
          filtered.map((inq) => (
            <div
              key={inq.id}
              className="rounded-3xl bg-white border border-[#EBDCCB] shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Photo preview if uploaded */}
              {inq.referenceImageUrl ? (
                <div className="relative aspect-16/9 w-full bg-amber-50">
                  <Image
                    src={inq.referenceImageUrl}
                    alt={inq.occasion}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Photo Reference
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-[#FAF7F2] border-b border-[#EBDCCB] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-900">{inq.inquiryNumber}</span>
                    <h3 className="font-serif-heading font-bold text-sm text-[#221610]">{inq.occasion}</h3>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-900">{inq.inquiryNumber}</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 text-[10px] font-bold">
                      {inq.status}
                    </span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-base text-[#221610]">
                    {inq.occasion} • {inq.tierSizeKg}
                  </h3>

                  <p className="text-xs text-[#786B62]">
                    Flavor: <strong className="text-[#221610]">{inq.flavor}</strong>
                  </p>

                  <p className="text-xs text-[#786B62]">
                    Customer: <strong className="text-[#221610]">{inq.customerName}</strong> ({inq.customerPhone})
                  </p>

                  <div className="pt-2 text-xs">
                    <span className="text-[#786B62]">Estimated Range: </span>
                    <strong className="text-amber-900">
                      {formatINR(inq.estimatedPriceMin || 0)} - {formatINR(inq.estimatedPriceMax || 0)}
                    </strong>
                  </div>

                  {inq.quotationPrice && (
                    <div className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      Official Quote: {formatINR(inq.quotationPrice)}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#EBDCCB] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(inq)}
                    className="flex-1 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors text-center"
                  >
                    Review &amp; Quote
                  </button>

                  <a
                    href={generateQuotationReplyWhatsAppLink(
                      inq,
                      inq.quotationPrice || inq.estimatedPriceMin || 0,
                      inq.adminNotes || "We would love to bake your dream celebration cake!"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    aria-label="WhatsApp Customer"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Inquiry Detail & Quotation Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#EBDCCB] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBDCCB]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#786B62]">Inquiry Specification</span>
                <h3 className="font-mono text-xl font-bold text-amber-900">
                  {selectedInquiry.inquiryNumber}
                </h3>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-full hover:bg-amber-50 text-[#786B62]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reference Photo if available */}
            {selectedInquiry.referenceImageUrl && (
              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-[#EBDCCB] bg-amber-50">
                <Image
                  src={selectedInquiry.referenceImageUrl}
                  alt="Customer Reference Image"
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Cake Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] space-y-1.5">
                <div className="font-bold text-[#221610] text-sm">Customer &amp; Logistics</div>
                <div>Customer: <strong>{selectedInquiry.customerName}</strong></div>
                <div>Phone: <strong>{selectedInquiry.customerPhone}</strong></div>
                <div>Delivery Date: <strong>{formatDate(selectedInquiry.deliveryDate)} ({selectedInquiry.deliverySlot})</strong></div>
                <div>Address: {selectedInquiry.address || "Store Pickup"}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] space-y-1.5">
                <div className="font-bold text-[#221610] text-sm">Cake Specs</div>
                <div>Occasion: <strong>{selectedInquiry.occasion}</strong></div>
                <div>Flavor: <strong>{selectedInquiry.flavor}</strong></div>
                <div>Size/Tiers: <strong>{selectedInquiry.tierSizeKg}</strong></div>
                <div>Dietary: <strong className="text-emerald-700">{selectedInquiry.isEggless ? "100% Eggless" : "Standard"}</strong></div>
              </div>
            </div>

            {/* Custom Messages & Instructions */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDCCB] space-y-1 text-xs">
              <div className="font-bold text-[#221610]">Personalization &amp; Design Notes:</div>
              {selectedInquiry.cakeMessage && <div>Plaque Message: &quot;{selectedInquiry.cakeMessage}&quot;</div>}
              {selectedInquiry.themeColor && <div>Theme Colors: {selectedInquiry.themeColor}</div>}
              {selectedInquiry.toppings && <div>Special Toppers: {selectedInquiry.toppings}</div>}
              {selectedInquiry.designNotes && <div>Design Instructions: &quot;{selectedInquiry.designNotes}&quot;</div>}
            </div>

            {/* Chef Quotation Form */}
            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-4">
              <h4 className="font-bold text-sm text-[#221610] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Set Official Bakery Quotation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#221610] mb-1">
                    Confirmed Quotation Price (₹)
                  </label>
                  <input
                    type="number"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    placeholder="e.g. 3850"
                    className="w-full bg-white border border-amber-300 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] font-bold focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#221610] mb-1">
                    Inquiry Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleSaveQuotation(e.target.value)}
                    className="w-full bg-white border border-amber-300 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] font-bold focus:outline-none focus:border-amber-600"
                  >
                    {INQUIRY_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221610] mb-1">
                  Chef Notes to Customer
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g., Confirmed with organic edible fresh flowers and gold leaf accents. Slot reserved."
                  className="w-full bg-white border border-amber-300 px-4 py-2 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleSaveQuotation("QUOTATION_SENT")}
                  className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save &amp; Mark Quote Sent</span>
                </button>

                <a
                  href={generateQuotationReplyWhatsAppLink(
                    selectedInquiry,
                    Number(quotePrice) || selectedInquiry.quotationPrice || 3850,
                    adminNotes
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Quotation to WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
