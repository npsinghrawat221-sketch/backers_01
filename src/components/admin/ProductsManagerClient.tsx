"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, Category } from "@/types/database";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { Plus, Trash2, Edit3, Cake, Star, Check, X, ShieldCheck } from "@/components/icons";

interface ProductsManagerClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductsManagerClient({
  initialProducts,
  categories,
}: ProductsManagerClientProps) {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("699");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [isEggless, setIsEggless] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !basePrice) return;

    setIsSubmitting(true);
    const genSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: genSlug,
          name: name.trim(),
          shortDesc: shortDesc.trim() || "Fresh artisanal bakery creation.",
          description: description.trim() || name.trim(),
          basePrice: parseFloat(basePrice),
          isEggless,
          isBestseller,
          isFeatured: true,
          isSpecial: false,
          rating: 4.9,
          reviewCount: 1,
          preparationTime: "2-3 Hours",
          stockStatus: "IN_STOCK",
          categoryId: categoryId || categories[0]?.id,
          images: [{ id: `img-${Date.now()}`, url: imageUrl, isPrimary: true, order: 0 }],
          variants: [
            { id: `var-0.5-${Date.now()}`, name: "0.5 kg", weightKg: 0.5, price: parseFloat(basePrice), servings: "4-6 Servings", inStock: true },
            { id: `var-1.0-${Date.now()}`, name: "1.0 kg", weightKg: 1.0, price: Math.round(parseFloat(basePrice) * 1.85), servings: "8-12 Servings", inStock: true },
          ],
        }),
      });

      const data = await res.json();
      if (data.success && data.product) {
        setProducts([data.product, ...products]);
        setIsAddModalOpen(false);
        setName("");
        setSlug("");
        setShortDesc("");
        setDescription("");
        showToast("New cake product added to menu!", "success");
      }
    } catch {
      showToast("Failed to create product", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productSlug: string) => {
    if (!confirm("Are you sure you want to remove this product from the menu?")) return;

    try {
      const res = await fetch(`/api/products/${productSlug}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.slug !== productSlug));
        showToast("Product deleted from catalog", "info");
      }
    } catch {
      showToast("Error deleting product", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Catalog &amp; Inventory
          </span>
          <h1 className="font-serif-heading text-3xl font-extrabold text-[#221610] tracking-tight">
            Menu Products ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62] mt-1">
            Create new cakes, update prices, manage weight variants and eggless badges.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl bg-white border border-[#EBDCCB] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-amber-50">
              <Image
                src={product.images[0]?.url || "/placeholder-cake.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                {product.isEggless ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    100% Eggless
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Contains Egg
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#221610] line-clamp-1">{product.name}</h3>
                <p className="text-xs text-[#786B62] line-clamp-2 mt-0.5">{product.shortDesc}</p>
                <div className="font-bold text-base text-amber-900 mt-2">
                  {formatINR(product.basePrice)}
                </div>
              </div>

              <div className="pt-3 border-t border-[#EBDCCB] flex items-center justify-between">
                <span className="text-[11px] text-[#786B62]">
                  {product.variants.length} weight variants
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(product.slug)}
                  className="p-1.5 rounded-lg text-[#786B62] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#EBDCCB] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBDCCB]">
              <h3 className="font-serif-heading text-xl font-bold text-[#221610]">
                Add New Cake to Menu
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-amber-50 text-[#786B62]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1">
                  Cake Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lotus Biscoff Caramel Cheesecake"
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1">
                    Starting Base Price (0.5 kg) *
                  </label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="699"
                    className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="e.g. Layered with Belgian chocolate ganache and crunchy praline."
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221610] mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EBDCCB] px-4 py-2 rounded-xl text-xs text-[#221610] focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#221610] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="rounded text-amber-700 w-4 h-4"
                  />
                  <span>100% Eggless Recipe</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-[#221610] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="rounded text-amber-700 w-4 h-4"
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EBDCCB] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] text-[#786B62] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
