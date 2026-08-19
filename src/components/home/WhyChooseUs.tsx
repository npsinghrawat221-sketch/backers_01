import React from "react";
import { Sparkles, Clock, Heart, Award, ShieldCheck, Truck } from "@/components/icons";

export function WhyChooseUs() {
  const features = [
    {
      icon: Sparkles,
      title: "100% Eggless Masterpieces",
      description:
        "Engineered with cultured dairy and organic fruit reductions to achieve the ultimate cloud-like moistness without eggs.",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      icon: Award,
      title: "Pure Belgian Chocolate",
      description:
        "We exclusively use 70% imported Belgian dark chocolate, Dutch cocoa, and real Madagascar vanilla beans. Never artificial compounds.",
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
    {
      icon: Clock,
      title: "Same Day & Express Delivery",
      description:
        "Fast doorstep delivery and scheduled slots across Purvanchal Silver City II, Greater Noida sectors, and Expressways.",
      color: "text-rose-800 bg-rose-50 border-rose-200",
    },
    {
      icon: Heart,
      title: "Fresh Fruit & Custom Artistry",
      description:
        "Specializing in seasonal fresh Alphonso mangoes, strawberries, exotic kiwi compotes, and bespoke celebration themes.",
      color: "text-purple-800 bg-purple-50 border-purple-200",
    },
    {
      icon: ShieldCheck,
      title: "Hygienic Home Bakery Kitchen",
      description:
        "Crafted in an immaculate, dedicated 100% eggless home baking studio with fresh premium ingredients.",
      color: "text-blue-800 bg-blue-50 border-blue-200",
    },
    {
      icon: Truck,
      title: "Free Delivery on Orders Over ₹799",
      description:
        "Enjoy complimentary express doorstep shipping on celebration orders with real-time live order tracking.",
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>The Honey Bunny Difference</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
            Why Greater Noida Loves Our Home Bakes
          </h2>
          <p className="text-sm text-[#786B62]">
            Every single sponge, ganache, and handcrafted bloom is baked fresh to order using time-honored European confectionery traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAF7F2] border border-[#EBDCCB] hover:border-amber-600 shadow-xs hover:shadow-lg transition-all card-hover-lift"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${feature.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-[#221610] mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#786B62] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
