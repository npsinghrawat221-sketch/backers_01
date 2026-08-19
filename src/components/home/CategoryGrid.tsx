import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "@/components/icons";
import { Category } from "@/types/database";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Explore by Occasion &amp; Flavor</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#221610] tracking-tight">
              Featured Cake Categories
            </h2>
          </div>
          
          <Link
            href="/cakes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 hover:underline transition-colors"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/cakes?category=${category.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#EBDCCB] shadow-xs hover:shadow-xl transition-all duration-300 card-hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-amber-50">
                <Image
                  src={category.image || "/placeholder-cake.jpg"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Title & Description Overlay */}
              <div className="p-4 sm:p-5">
                <h3 className="font-serif-heading text-base sm:text-lg font-bold text-[#221610] group-hover:text-amber-800 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-[#786B62] line-clamp-2 mt-1">
                  {category.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-800 group-hover:underline flex items-center gap-1">
                    Explore Cakes <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
