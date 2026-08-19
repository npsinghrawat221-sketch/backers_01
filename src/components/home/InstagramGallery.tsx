import React from "react";
import Image from "next/image";
import { Instagram, Heart, Sparkles } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function InstagramGallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
      title: "Belgian Dark Ganache",
      likes: "1.4k",
    },
    {
      url: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop",
      title: "Vintage Victorian Lambeth",
      likes: "2.1k",
    },
    {
      url: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600&auto=format&fit=crop",
      title: "Botanical Wedding Tiers",
      likes: "950",
    },
    {
      url: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600&auto=format&fit=crop",
      title: "Assorted Gourmet Cupcakes",
      likes: "1.8k",
    },
    {
      url: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop",
      title: "Crimson Red Velvet",
      likes: "1.1k",
    },
    {
      url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
      title: "Fudgy Walnut Brownies",
      likes: "870",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
              <Instagram className="w-4 h-4 text-amber-700" />
              <span>Follow Our Baking Journey</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
              From Our Patisserie Kitchen
            </h2>
          </div>

          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all shadow-xs"
          >
            <Instagram className="w-4 h-4 text-amber-700" />
            <span>@honey_bunny_homebakers</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((img, idx) => (
            <a
              key={idx}
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-amber-50 shadow-xs block card-hover-lift"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center text-white">
                <Instagram className="w-5 h-5 mb-1 text-amber-300" />
                <span className="text-[11px] font-bold line-clamp-1">{img.title}</span>
                <span className="text-[10px] text-amber-200 flex items-center gap-1 mt-0.5">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> {img.likes}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
