"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Sparkles, ArrowRight, Cake, Loader2 } from "@/components/icons";
import { formatINR } from "@/lib/utils";
import { Product } from "@/types/database";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success && data.products) {
          setResults(data.products);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 pb-10">
        <div className="relative inline-block w-full max-w-2xl text-left align-middle transition-all transform bg-white rounded-3xl shadow-2xl border border-[#EBDCCB] overflow-hidden">
          {/* Search Header Input */}
          <div className="p-5 sm:p-6 border-b border-[#EBDCCB] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#786B62] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cakes (e.g. Belgian Truffle, Red Velvet, 1kg Eggless)..."
              className="w-full text-base sm:text-lg bg-transparent text-[#221610] placeholder:text-[#B8AAA0] focus:outline-none font-medium"
            />
            {isLoading && <Loader2 className="w-5 h-5 text-amber-700 animate-spin shrink-0" />}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-amber-100 text-[#786B62] hover:text-[#221610] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Tags (when empty) */}
          {!query && (
            <div className="p-6 bg-[#FAF7F2] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#786B62] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Belgian Chocolate",
                  "100% Eggless",
                  "Red Velvet",
                  "Birthday Cake",
                  "Fruit Gateau",
                  "Vintage Lambeth",
                  "Cupcakes",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#EBDCCB] text-xs font-medium text-[#221610] hover:border-amber-700 hover:text-amber-800 transition-colors shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query && (
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#EBDCCB]/60">
              {results.length === 0 && !isLoading ? (
                <div className="text-center py-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-800">
                    <Cake className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-[#221610]">No cakes found matching &quot;{query}&quot;</p>
                  <p className="text-xs text-[#786B62]">
                    Try searching for chocolate, eggless, velvet, or explore our custom cake builder.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/custom-cakes"
                      onClick={onClose}
                      className="inline-block text-xs font-bold text-amber-800 hover:underline"
                    >
                      Design a custom cake instead →
                    </Link>
                  </div>
                </div>
              ) : (
                results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/cakes/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-amber-50/70 transition-colors group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-[#EBDCCB]">
                      <Image
                        src={product.images[0]?.url || "/placeholder-cake.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif-heading font-bold text-sm text-[#221610] group-hover:text-amber-800 transition-colors truncate">
                          {product.name}
                        </h4>
                        {product.isEggless && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold shrink-0">
                            Eggless
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#786B62] truncate mt-0.5">{product.shortDesc}</p>
                      <div className="font-bold text-xs text-amber-900 mt-1">
                        Starting at {formatINR(product.basePrice)}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B8AAA0] group-hover:text-amber-800 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
