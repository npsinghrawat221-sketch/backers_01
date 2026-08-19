"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Sparkles,
  Truck,
  Clock,
  ShieldCheck,
  Check,
  MessageCircle,
  Plus,
  Minus,
  Heart,
  Share2,
  Calendar,
  MapPin,
} from "@/components/icons";
import { Product, ProductAddon, Review } from "@/types/database";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
  product: Product;
  addons: ProductAddon[];
  reviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  addons,
  reviews,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] || {
      id: "default",
      productId: product.id,
      name: "0.5 kg",
      price: product.basePrice,
      weightKg: 0.5,
      servings: "4-6 Servings",
      inStock: true,
    }
  );
  const [isEggless, setIsEggless] = useState(product.isEggless);
  const [cakeMessage, setCakeMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deliverySlot, setDeliverySlot] = useState(
    siteConfig.delivery.deliveryTimeSlots[1]?.label || "Afternoon Slot"
  );
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.startsWith("560")) {
      setPincodeStatus("Delivery Available! Express 2-hour shipping active.");
    } else if (pincode.length === 6) {
      setPincodeStatus("Standard delivery available on 24-hr advance notice.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Bangalore PIN.");
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.url || "/placeholder-cake.jpg",
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      weightKg: selectedVariant.weightKg,
      unitPrice: selectedVariant.price,
      quantity,
      cakeMessage: cakeMessage.trim() || undefined,
      eggless: isEggless,
    });

    showToast(`Added ${quantity}x "${product.name}" to basket!`, "success");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast("Please complete all review fields", "error");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          customerName: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      if (res.ok) {
        showToast("Thank you! Your review has been posted.", "success");
        setReviewName("");
        setReviewComment("");
      }
    } catch {
      showToast("Failed to submit review", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const currentPrice = selectedVariant.price * quantity;

  return (
    <div className="space-y-16">
      {/* Top Product Section: Gallery & Purchase Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-amber-50 border border-[#EBDCCB] shadow-lg">
            <Image
              src={product.images[activeImageIndex]?.url || "/placeholder-cake.jpg"}
              alt={product.images[activeImageIndex]?.alt || product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isBestseller && (
                <span className="px-3 py-1 rounded-full bg-amber-700 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Bestseller
                </span>
              )}
              {product.isEggless && (
                <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  100% Eggless
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-amber-50 shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-amber-700 shadow-md ring-2 ring-amber-300"
                      : "border-[#EBDCCB] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Bakery Guarantee Card */}
          <div className="p-5 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#221610] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Velvet &amp; Crumb Quality Promise
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#786B62]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Baked 2 hrs before dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>Chilled delivery vans</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>100% Belgian chocolate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Complimentary candles &amp; knife</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization & Purchase (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Rating & Category */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 bg-amber-100/80 px-2.5 py-1 rounded-xl text-amber-950 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                <span>{product.rating}</span>
                <span className="text-[#786B62] font-normal">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-xs text-[#786B62]">•</span>
              <span className="text-xs font-semibold text-amber-800">
                {product.category?.name || "Signature Cake"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#221610] tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif-heading text-3xl font-extrabold text-amber-900">
                {formatINR(currentPrice)}
              </span>
              <span className="text-xs text-[#786B62]">
                (Inclusive of all taxes &amp; luxury gift packaging)
              </span>
            </div>

            <p className="text-sm text-[#786B62] mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 1. Select Weight / Variant */}
          <div className="space-y-2.5 pt-4 border-t border-[#EBDCCB]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#221610]">
                Select Cake Size &amp; Weight: <span className="text-amber-800">{selectedVariant.name}</span>
              </label>
              <span className="text-xs font-semibold text-amber-900/80">
                {selectedVariant.servings}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedVariant.id === variant.id
                      ? "bg-amber-800 text-white border-amber-800 shadow-md ring-2 ring-amber-300"
                      : "bg-white text-[#221610] border-[#EBDCCB] hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">{variant.name}</div>
                  <div className={`text-[11px] font-semibold mt-0.5 ${selectedVariant.id === variant.id ? "text-amber-200" : "text-amber-900"}`}>
                    {formatINR(variant.price)}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${selectedVariant.id === variant.id ? "text-white/80" : "text-[#786B62]"}`}>
                    {variant.servings}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Eggless Preference */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EBDCCB] shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-[#221610]">100% Eggless Recipe</div>
                <div className="text-[11px] text-[#786B62]">Cloud-soft texture guaranteed</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEggless(!isEggless)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isEggless
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-[#786B62] border-[#EBDCCB]"
              }`}
            >
              {isEggless ? "✓ Eggless Selected" : "Egg Sponge"}
            </button>
          </div>

          {/* 3. Personalised Cake Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#221610] flex items-center justify-between">
              <span>Message on Cake Plaque (Free):</span>
              <span className="text-[11px] text-[#786B62] font-normal">Max 35 characters</span>
            </label>
            <input
              type="text"
              maxLength={35}
              value={cakeMessage}
              onChange={(e) => setCakeMessage(e.target.value)}
              placeholder="e.g. Happy 30th Birthday Sarah!"
              className="w-full bg-white border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] placeholder:text-[#786B62] focus:outline-none focus:border-amber-600 shadow-2xs"
            />
          </div>

          {/* 4. Delivery Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#221610] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-700" /> Delivery Date:
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-white border border-[#EBDCCB] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 shadow-2xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#221610] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" /> Time Slot:
              </label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full bg-white border border-[#EBDCCB] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 shadow-2xs font-medium"
              >
                {siteConfig.delivery.deliveryTimeSlots.map((slot) => (
                  <option key={slot.id} value={slot.label}>
                    {slot.label} ({slot.time})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Quantity and Main Actions */}
          <div className="pt-4 border-t border-[#EBDCCB] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#EBDCCB] rounded-2xl bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-amber-100 text-[#786B62] hover:text-[#221610] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#221610]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-amber-100 text-[#786B62] hover:text-[#221610] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket</span>
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#221610] hover:bg-black text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Direct WhatsApp Inquiry Button */}
            <a
              href={getWhatsAppUrl(
                `Hello Velvet & Crumb! I'm interested in ordering the ${product.name} (${selectedVariant.name}, ${formatINR(selectedVariant.price)}). Is this available for delivery on ${deliveryDate}?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Inquire / Order this Cake via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs: Ingredients, Allergens, Delivery Details */}
      <div className="p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-6">
        <h3 className="font-serif-heading text-xl font-bold text-[#221610]">
          Cake Ingredients &amp; Freshness Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#786B62]">
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
            <div className="font-bold text-[#221610] flex items-center gap-1.5">
              <span>🌾 Fine Ingredients</span>
            </div>
            <p>{product.ingredients || "Belgian Dark Chocolate, Dutch Cocoa, Organic Flour, Unsalted Dairy Butter, Madagascar Vanilla."}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
            <div className="font-bold text-[#221610] flex items-center gap-1.5">
              <span>⚠️ Allergen Information</span>
            </div>
            <p>{product.allergens || "Contains Dairy & Gluten. 100% Eggless baking facility."}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
            <div className="font-bold text-[#221610] flex items-center gap-1.5">
              <span>❄️ Storage &amp; Care</span>
            </div>
            <p>Refrigerate upon arrival. For optimal flavor and sponge softness, allow to sit at room temperature for 15 minutes before serving.</p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-heading text-2xl font-bold text-[#221610]">
              Customer Reviews ({reviews.length})
            </h3>
            <p className="text-xs text-[#786B62]">Real feedback from verified cake celebrations</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                {rev.title && (
                  <h5 className="font-bold text-sm text-[#221610] mb-1">&quot;{rev.title}&quot;</h5>
                )}
                <p className="text-xs text-[#786B62] leading-relaxed italic">{rev.comment}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#EBDCCB]/60 flex items-center justify-between text-xs">
                <span className="font-bold text-[#221610]">{rev.customerName}</span>
                <span className="text-emerald-700 font-semibold">✓ Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a Review Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-4">
          <h4 className="font-serif-heading text-lg font-bold text-[#221610]">
            Leave a Celebration Review
          </h4>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#221610] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Priya S."
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#221610] mb-1">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 / 5 - Exceptional)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 / 5 - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 / 5 - Good)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#221610] mb-1">Your Experience</label>
              <textarea
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your thoughts on the taste, texture, delivery, and celebration..."
                className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-md transition-colors"
            >
              {isSubmittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#EBDCCB]">
          <h3 className="font-serif-heading text-2xl font-bold text-[#221610]">
            You May Also Love
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <div
                key={rel.id}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#EBDCCB] shadow-xs hover:shadow-xl transition-all card-hover-lift"
              >
                <Link href={`/cakes/${rel.slug}`} className="relative aspect-square block bg-amber-50">
                  <Image
                    src={rel.images[0]?.url || "/placeholder-cake.jpg"}
                    alt={rel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-4">
                  <Link href={`/cakes/${rel.slug}`}>
                    <h4 className="font-bold text-sm text-[#221610] group-hover:text-amber-800 line-clamp-1 transition-colors">
                      {rel.name}
                    </h4>
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#221610]">{formatINR(rel.basePrice)}</span>
                    <Link
                      href={`/cakes/${rel.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
