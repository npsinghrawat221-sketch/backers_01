"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "@/components/icons";
import { getFAQSchema } from "@/lib/seo/schema";
import { getWhatsAppUrl } from "@/config/site";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are all your cakes 100% eggless?",
      answer:
        "Yes! The vast majority of our menu is 100% pure eggless. We use artisan dairy techniques, organic Greek yogurt, and fruit reductions to ensure our cakes are ultra-moist, fluffy, and decadent without compromising on authentic patisserie taste.",
    },
    {
      question: "How fast can I get a cake delivered in Bangalore?",
      answer:
        "We offer Same-Day Express Delivery in 2 to 3 hours across Bangalore for standard signature cakes ordered before 7:00 PM. We also offer Midnight Surprise delivery slots between 11:00 PM and 12:15 AM.",
    },
    {
      question: "How does the Custom & Designer Cake ordering process work?",
      answer:
        "You can use our online 7-step Custom Cake Builder to upload a reference photo, select flavor, weight, tiers, and personalized message. You will receive an instant estimated price range, and our cake artist will confirm your quotation and design details via WhatsApp.",
    },
    {
      question: "What cake size / weight should I order for my party?",
      answer:
        "As a rule of thumb: 0.5 kg serves 4 to 6 people, 1.0 kg serves 8 to 12 people, 1.5 kg serves 14 to 18 people, and 2.0 kg+ or 2-Tier cakes serve 20 to 30+ guests.",
    },
    {
      question: "Can I add a personalized message and candles to my order?",
      answer:
        "Yes, every cake comes with complimentary birthday candles, knife, and a free personalized chocolate plaque message written by our chefs. You can also add designer acrylic toppers and sparklers during checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major online payment methods via Razorpay (UPI, Google Pay, PhonePe, Credit/Debit cards, NetBanking) as well as Cash on Delivery / Store Pickup.",
    },
  ];

  const faqSchema = getFAQSchema(faqs);

  return (
    <section className="py-20 bg-white border-t border-[#EBDCCB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#786B62]">
            Everything you need to know about cake ordering, custom designs, and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#EBDCCB] bg-[#FAF7F2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-heading font-bold text-base text-[#221610] hover:text-amber-800 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#786B62] leading-relaxed border-t border-[#EBDCCB]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp support callout */}
        <div className="mt-10 p-6 rounded-3xl bg-amber-50 border border-amber-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-sm text-[#221610]">Have a specific cake question or allergy concern?</h4>
            <p className="text-xs text-[#786B62]">Our master pastry chef is active on WhatsApp to guide you.</p>
          </div>

          <a
            href={getWhatsAppUrl("Hi Honey Bunny Bakers! I have a question about placing a cake order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
