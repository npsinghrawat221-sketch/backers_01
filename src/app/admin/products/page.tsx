import React from "react";
import { db } from "@/lib/db";
import { ProductsManagerClient } from "@/components/admin/ProductsManagerClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    db.product.findMany(),
    db.category.findMany(),
  ]);

  return <ProductsManagerClient initialProducts={products} categories={categories} />;
}
