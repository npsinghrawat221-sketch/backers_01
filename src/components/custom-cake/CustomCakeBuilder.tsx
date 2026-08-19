"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Cake,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  HelpCircle,
  Layers,
  Heart,
  Palette,
  User,
  Phone,
  Mail,
  Copy,
} from "@/components/icons";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

const OCCASIONS = [
  { id: "birthday", label: "Birthday Celebration", icon: "🎂" },
  { id: "anniversary", label: "Milestone Anniversary", icon: "💍" },
  { id: "wedding", label: "Wedding & Reception", icon: "👰" },
  { id: "engagement", label: "Engagement & Roka", icon: "💎" },
  { id: "babyshower", label: "Baby Shower & Gender Reveal", icon: "🍼" },
  { id: "kidsparty", label: "Kids Themed Party", icon: "🎈" },
  { id: "corporate", label: "Corporate Gala / Launch", icon: "🏢" },
  { id: "other", label: "Special Celebration", icon: "✨" },
];

const FLAVORS = [
  { id: "fruit-cake", name: "Fresh Mixed Fruit Gateau", tag: "Signature Best Seller", premiumMultiplier: 1.1 },
  { id: "biscoff", name: "Lotus Biscoff Caramel Cake", tag: "Gourmet Sensation", premiumMultiplier: 1.25 },
  { id: "truffle", name: "Pure Belgian Truffle Cake", tag: "70% Dark Ganache", premiumMultiplier: 1.15 },
  { id: "fruit-mango", name: "Alphonso Fruit Mango Cake", tag: "Real Mango Puree", premiumMultiplier: 1.1 },
  { id: "red-velvet", name: "Classic Red Velvet Cream Cheese", tag: "Cream Cheese Frosting", premiumMultiplier: 1.1 },
  { id: "chocolate-walnut", name: "Chocolate Roasted Walnut Cake", tag: "California Walnuts", premiumMultiplier: 1.15 },
  { id: "strawberry", name: "Fresh Strawberry Glaze Cake", tag: "Strawberry Compote", premiumMultiplier: 1.0 },
  { id: "blueberry", name: "Wild Blueberry Blossom Cake", tag: "Whole Blueberries", premiumMultiplier: 1.0 },
  { id: "pineapple", name: "Tropical Pineapple Gateau", tag: "Juicy Pineapple Chunks", premiumMultiplier: 1.0 },
  { id: "butterscotch", name: "Crunchy Butterscotch Praline", tag: "Cashew Praline Crunch", premiumMultiplier: 1.0 },
  { id: "rasmalai", name: "Royal Rasmalai & Pistachio", tag: "Saffron Rabdi Infusion", premiumMultiplier: 1.15 },
  { id: "black-forest", name: "German Black Forest Cherry", tag: "Sour Cherries & Flakes", premiumMultiplier: 1.05 },
  { id: "chocolate", name: "Dutch Chocolate Fudge Cake", tag: "Rich Cocoa Glaze", premiumMultiplier: 1.0 },
  { id: "ice-cream", name: "Artisanal Ice Cream Cake", tag: "Chilled Layered Dessert", premiumMultiplier: 1.15 },
  { id: "vanilla", name: "Classic Madagascar Vanilla", tag: "Light & Fluffy Sponge", premiumMultiplier: 0.95 },
];

const SIZES = [
  { id: "0.5kg", name: "0.5 kg", servings: "4-6 Servings", baseEst: 699, tier: "Single Tier" },
  { id: "1.0kg", name: "1.0 kg", servings: "8-12 Servings", baseEst: 1299, tier: "Single Tier" },
  { id: "1.5kg", name: "1.5 kg", servings: "14-18 Servings", baseEst: 1899, tier: "Single Tier" },
  { id: "2.0kg", name: "2.0 kg", servings: "20-24 Servings", baseEst: 2499, tier: "Single Tier / Wide" },
  { id: "2-tier-3kg", name: "2-Tier (3.0 kg)", servings: "30-35 Servings", baseEst: 3899, tier: "2 Tiers" },
  { id: "3-tier-5kg", name: "3-Tier (5.0 kg)", servings: "50-60 Servings", baseEst: 6499, tier: "3 Tiers Grand" },
];

const SIGNATURE_STYLES = [
  {
    id: "vintage-lambeth",
    name: "Vintage Lambeth Victorian Piping",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop",
    desc: "Intricate scalloped borders, ruffled frills, and cherries.",
  },
  {
    id: "botanical-floral",
    name: "Botanical Floral & Gold Shimmer",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600&auto=format&fit=crop",
    desc: "Fresh organic edible florals, semi-naked ganache, 24k gold foil.",
  },
  {
    id: "korean-bento",
    name: "Minimalist Pastel Aesthetic",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?q=80&w=600&auto=format&fit=crop",
    desc: "Clean pastel hues, lettering plaque, modern minimalism.",
  },
  {
    id: "chocolate-sculpted",
    name: "Belgian Drip & Gourmet Macarons",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    desc: "Dark chocolate drip, French macarons, chocolate bark.",
  },
];

export function CustomCakeBuilder() {
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [occasion, setOccasion] = useState(OCCASIONS[0].label);
  const [flavor, setFlavor] = useState(FLAVORS[0].name);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [isEggless, setIsEggless] = useState(true);
  const [designStyle, setDesignStyle] = useState(SIGNATURE_STYLES[0].name);
  const [referencePhotoUrl, setReferencePhotoUrl] = useState("");
  const [customPhotoPreview, setCustomPhotoPreview] = useState<string | null>(null);
  const [designNotes, setDesignNotes] = useState("");
  const [cakeMessage, setCakeMessage] = useState("");
  const [themeColor, setThemeColor] = useState("Pastel Pink & Gold");
  const [toppings, setToppings] = useState("");
  const [nameOnCake, setNameOnCake] = useState("");
  const [ageOnCake, setAgeOnCake] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]
  );
  const [deliverySlot, setDeliverySlot] = useState(siteConfig.delivery.deliveryTimeSlots[1]?.label || "Afternoon Slot");
  const [deliveryType, setDeliveryType] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);

  // Price estimation calculation
  const selectedFlavorObj = FLAVORS.find((f) => f.name === flavor) || FLAVORS[0];
  const basePrice = selectedSize.baseEst * selectedFlavorObj.premiumMultiplier;
  const estimatedMin = Math.round(basePrice * 0.95);
  const estimatedMax = Math.round(basePrice * 1.15);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomPhotoPreview(reader.result as string);
        setReferencePhotoUrl(reader.result as string);
        showToast("Reference photo uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitInquiry = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      showToast("Please provide your contact name and phone number", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/custom-cakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail: customerEmail.trim() || undefined,
          customerWhatsapp: customerPhone,
          occasion,
          flavor,
          tierSizeKg: `${selectedSize.name} (${selectedSize.tier})`,
          servingsEstimate: selectedSize.servings,
          referenceImageUrl: referencePhotoUrl || null,
          designNotes,
          cakeMessage,
          themeColor,
          toppings,
          nameOnCake,
          ageOnCake,
          isEggless,
          deliveryDate,
          deliverySlot,
          deliveryType,
          address,
          estimatedPriceMin: estimatedMin,
          estimatedPriceMax: estimatedMax,
        }),
      });

      const data = await res.json();
      if (data.success && data.inquiry) {
        setSubmittedInquiry(data.inquiry);
        showToast(`Inquiry #${data.inquiry.inquiryNumber} created!`, "success");
      } else {
        showToast(data.error || "Failed to submit custom cake request", "error");
      }
    } catch {
      showToast("Error submitting inquiry. Please try again or WhatsApp us.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: "Occasion" },
    { num: 2, title: "Flavor" },
    { num: 3, title: "Size & Tiers" },
    { num: 4, title: "Design & Photo" },
    { num: 5, title: "Personalization" },
    { num: 6, title: "Schedule" },
    { num: 7, title: "Estimate & Submit" },
  ];

  if (submittedInquiry) {
    const whatsappMessage = `Hello Velvet & Crumb! I just submitted custom cake inquiry *#${submittedInquiry.inquiryNumber}* for a ${submittedInquiry.occasion} on ${submittedInquiry.deliveryDate}.\n\n*Flavor:* ${submittedInquiry.flavor}\n*Size:* ${submittedInquiry.tierSizeKg}\n*Message on Cake:* "${submittedInquiry.cakeMessage || "None"}"\n*Estimated Quote:* ${formatINR(submittedInquiry.estimatedPriceMin)} - ${formatINR(submittedInquiry.estimatedPriceMax)}\n\nLooking forward to your quotation confirmation!`;

    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EBDCCB] shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Quotation Request Received
            </span>
            <h2 className="font-serif-heading text-3xl font-extrabold text-[#221610] mt-1">
              Thank You, {submittedInquiry.customerName}!
            </h2>
            <p className="text-sm text-[#786B62] mt-2">
              Your inquiry reference number is:
            </p>
            <div className="inline-block mt-2 px-4 py-2 rounded-2xl bg-amber-100/70 border border-amber-300 font-mono text-lg font-bold text-amber-950">
              {submittedInquiry.inquiryNumber}
            </div>
          </div>

          {/* Quotation Details Summary */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] text-left space-y-2 text-xs sm:text-sm text-[#786B62]">
            <div className="flex justify-between pb-1 border-b border-[#EBDCCB]/60">
              <span className="font-medium text-[#221610]">Occasion:</span>
              <span className="font-bold text-[#221610]">{submittedInquiry.occasion}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-[#EBDCCB]/60">
              <span className="font-medium text-[#221610]">Flavor &amp; Sponge:</span>
              <span className="font-bold text-[#221610]">{submittedInquiry.flavor}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-[#EBDCCB]/60">
              <span className="font-medium text-[#221610]">Size &amp; Weight:</span>
              <span className="font-bold text-[#221610]">{submittedInquiry.tierSizeKg}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-[#EBDCCB]/60">
              <span className="font-medium text-[#221610]">Delivery Date:</span>
              <span className="font-bold text-[#221610]">{submittedInquiry.deliveryDate} ({submittedInquiry.deliverySlot})</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-medium text-[#221610]">Estimated Price Range:</span>
              <span className="font-bold text-amber-900 font-serif-heading text-base">
                {formatINR(submittedInquiry.estimatedPriceMin)} - {formatINR(submittedInquiry.estimatedPriceMax)}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirm &amp; Discuss on WhatsApp with Chef</span>
            </a>

            <div className="flex justify-center gap-3">
              <Link
                href="/cakes"
                className="px-6 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200"
              >
                Browse Signature Cakes
              </Link>
              <button
                onClick={() => {
                  setSubmittedInquiry(null);
                  setCurrentStep(1);
                }}
                className="px-6 py-3 rounded-2xl bg-white border border-[#EBDCCB] text-[#786B62] hover:text-[#221610] font-semibold text-xs"
              >
                Design Another Cake
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Progress Header */}
      <div className="mb-8 p-4 sm:p-6 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-3">
          <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</span>
          <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#EBDCCB]">
          <div
            className="bg-amber-700 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Indicator Badges */}
        <div className="hidden sm:flex items-center justify-between mt-4 text-[11px] font-medium text-[#786B62]">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex items-center gap-1 transition-colors ${
                currentStep === s.num
                  ? "text-amber-800 font-bold"
                  : currentStep > s.num
                  ? "text-emerald-700 font-semibold"
                  : "text-[#B8AAA0]"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep === s.num
                    ? "bg-amber-800 text-white font-bold"
                    : currentStep > s.num
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-[#FAF7F2] text-[#786B62]"
                }`}
              >
                {currentStep > s.num ? "✓" : s.num}
              </span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Body Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EBDCCB] shadow-xl space-y-8 min-h-[420px]">
        {/* Step 1: Occasion */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Step 1</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                What are you celebrating?
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                Select the occasion to help our pastry chefs tailor design aesthetics, colors, and tier proportions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setOccasion(occ.label)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    occasion === occ.label
                      ? "bg-amber-800 text-white border-amber-800 shadow-md ring-2 ring-amber-300"
                      : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB] hover:bg-amber-50 hover:border-amber-400"
                  }`}
                >
                  <div className="text-2xl mb-1.5">{occ.icon}</div>
                  <div className="font-bold text-xs sm:text-sm">{occ.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Flavor */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Step 2</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                Select Cake Flavor &amp; Sponge
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                All sponges are crafted with authentic European ingredients and 100% eggless options.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {FLAVORS.map((flv) => (
                <button
                  key={flv.id}
                  type="button"
                  onClick={() => setFlavor(flv.name)}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    flavor === flv.name
                      ? "bg-amber-800 text-white border-amber-800 shadow-md ring-2 ring-amber-300"
                      : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB] hover:bg-amber-50 hover:border-amber-400"
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm">{flv.name}</div>
                    <div className={`text-[11px] mt-0.5 ${flavor === flv.name ? "text-amber-200" : "text-[#786B62]"}`}>
                      {flv.tag}
                    </div>
                  </div>
                  {flavor === flv.name && <CheckCircle2 className="w-5 h-5 text-amber-300" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Size & Tiers */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Step 3</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                Choose Cake Size &amp; Tiers
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                How many guests will be celebrating? Select single or multi-tier structures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {SIZES.map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    selectedSize.id === sz.id
                      ? "bg-amber-800 text-white border-amber-800 shadow-md ring-2 ring-amber-300"
                      : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB] hover:bg-amber-50 hover:border-amber-400"
                  }`}
                >
                  <div className="font-bold text-sm sm:text-base">{sz.name}</div>
                  <div className={`text-xs font-semibold mt-1 ${selectedSize.id === sz.id ? "text-amber-200" : "text-amber-900"}`}>
                    {sz.servings}
                  </div>
                  <div className={`text-[11px] mt-1 ${selectedSize.id === sz.id ? "text-white/80" : "text-[#786B62]"}`}>
                    {sz.tier}
                  </div>
                </button>
              ))}
            </div>

            {/* Dietary Toggle */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="text-xs sm:text-sm font-bold text-[#221610]">Dietary Preference:</span>
              </div>
              <button
                type="button"
                onClick={() => setIsEggless(!isEggless)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isEggless
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-[#786B62] border-[#EBDCCB]"
                }`}
              >
                {isEggless ? "✓ 100% Eggless Sponge" : "Standard Egg Sponge"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Design & Photo Upload */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Step 4</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                Design Style &amp; Photo Reference
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                Upload your reference image (Pinterest/Instagram) or choose from our signature artisan styles.
              </p>
            </div>

            {/* Upload Area */}
            <div className="p-6 rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/50 text-center space-y-3">
              {customPhotoPreview ? (
                <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <Image src={customPhotoPreview} alt="Reference Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPhotoPreview(null);
                      setReferencePhotoUrl("");
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs font-bold shadow"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-800">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#221610]">
                    Upload Inspiration Photo Reference
                  </div>
                  <p className="text-xs text-[#786B62]">
                    Drag &amp; drop PNG, JPG or WebP (Max 10MB)
                  </p>
                  <label className="inline-block px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold cursor-pointer transition-colors">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Signature Design Styles */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-3">
                Or Select From Signature Cake Styles:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SIGNATURE_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setDesignStyle(style.name)}
                    className={`rounded-2xl overflow-hidden border text-left transition-all ${
                      designStyle === style.name
                        ? "border-amber-800 ring-2 ring-amber-400 shadow-md bg-amber-50"
                        : "border-[#EBDCCB] bg-[#FAF7F2] hover:border-amber-400"
                    }`}
                  >
                    <div className="relative aspect-square w-full bg-amber-50">
                      <Image src={style.image} alt={style.name} fill className="object-cover" />
                    </div>
                    <div className="p-2.5">
                      <div className="font-bold text-xs text-[#221610] line-clamp-1">{style.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                Describe Any Specific Design Customizations:
              </label>
              <textarea
                rows={2}
                value={designNotes}
                onChange={(e) => setDesignNotes(e.target.value)}
                placeholder="e.g., Peach and champagne color palette, gold drip with edible pearls, fresh white roses..."
                className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        )}

        {/* Step 5: Personalization & Details */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Step 5</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                Personalization &amp; Details
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                Add personalized messages, recipient names, and custom theme colors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Message Written on Cake Plaque
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Siddharth!"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Theme Colors
                </label>
                <input
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  placeholder="e.g. Pastel Pink, Ivory &amp; Gold"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Name on Cake / Topper
                </label>
                <input
                  type="text"
                  value={nameOnCake}
                  onChange={(e) => setNameOnCake(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Age / Milestone Number (Optional)
                </label>
                <input
                  type="text"
                  value={ageOnCake}
                  onChange={(e) => setAgeOnCake(e.target.value)}
                  placeholder="e.g. 25, 30, 50"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                Special Toppers &amp; Elements
              </label>
              <input
                type="text"
                value={toppings}
                onChange={(e) => setToppings(e.target.value)}
                placeholder="e.g. Gold sparkler, acrylic happy birthday topper, edible gold leaf, macarons"
                className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        )}

        {/* Step 6: Delivery & Schedule */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Step 6</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                Schedule &amp; Delivery Logistics
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                Choose your preferred celebration date and doorstep delivery or store pickup.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Celebration Date
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Preferred Delivery Slot
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

            {/* Delivery vs Pickup */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType("DELIVERY")}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all ${
                  deliveryType === "DELIVERY"
                    ? "bg-amber-800 text-white border-amber-800 shadow-md"
                    : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB]"
                }`}
              >
                🛵 Doorstep Delivery
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType("PICKUP")}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all ${
                  deliveryType === "PICKUP"
                    ? "bg-amber-800 text-white border-amber-800 shadow-md"
                    : "bg-[#FAF7F2] text-[#221610] border-[#EBDCCB]"
                }`}
              >
                🏪 Studio Pickup (Purvanchal Silver City II)
              </button>
            </div>

            {deliveryType === "DELIVERY" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Delivery Address &amp; Greater Noida Sector
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Tower / Flat No, Society Name (e.g. Purvanchal Silver City, Eldeco, Gaur City, Sector Pi-2, Alpha)"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 7: Customer Contact & Live Price Estimator */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Final Step</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#221610] mt-1">
                Estimated Price &amp; Contact Details
              </h2>
              <p className="text-xs sm:text-sm text-[#786B62] mt-1">
                Review your custom cake quotation estimate and submit to connect with our chef on WhatsApp.
              </p>
            </div>

            {/* Live Price Calculation Box */}
            <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Estimated Quotation Range
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Instant Estimate
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-amber-950">
                  {formatINR(estimatedMin)} - {formatINR(estimatedMax)}
                </span>
                <span className="text-xs text-[#786B62]">
                  (Final price verified upon reference photo complexity)
                </span>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-amber-200 text-xs text-[#786B62]">
                <div>
                  <span className="block text-[#B8AAA0]">Occasion:</span>
                  <strong className="text-[#221610]">{occasion}</strong>
                </div>
                <div>
                  <span className="block text-[#B8AAA0]">Flavor:</span>
                  <strong className="text-[#221610]">{flavor}</strong>
                </div>
                <div>
                  <span className="block text-[#B8AAA0]">Size:</span>
                  <strong className="text-[#221610]">{selectedSize.name}</strong>
                </div>
                <div>
                  <span className="block text-[#B8AAA0]">Dietary:</span>
                  <strong className="text-emerald-700">{isEggless ? "100% Eggless" : "Standard"}</strong>
                </div>
              </div>
            </div>

            {/* Contact Input Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1.5">
                Email Address (Optional for Quotation Receipt)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="e.g. priya@example.com"
                className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-medium"
              />
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="pt-6 border-t border-[#EBDCCB] flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-amber-100 text-[#221610] font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 ml-auto"
            >
              <span>Continue to {steps[currentStep].title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitInquiry}
              className="px-8 py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? "Submitting Quotation Request..." : "Submit Custom Cake Request"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
