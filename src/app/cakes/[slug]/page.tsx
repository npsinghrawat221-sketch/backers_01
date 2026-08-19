import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.seoTitle || `${product.name} | Velvet & Crumb`,
    description: product.seoDescription || product.shortDesc,
    keywords: product.seoKeywords ? product.seoKeywords.split(", ") : undefined,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [
        {
          url: product.images[0]?.url || siteConfig.ogImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) {
    notFound();
  }

  const [addons, reviews, relatedProducts] = await Promise.all([
    db.addon.findMany(),
    db.review.findMany({ where: { productId: product.id, isApproved: true } }),
    db.product.findMany({
      where: { categoryId: product.categoryId },
      take: 4,
    }),
  ]);

  const productSchema = getProductSchema(product);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Cakes", url: `${siteConfig.url}/cakes` },
    { name: product.name, url: `${siteConfig.url}/cakes/${product.slug}` },
  ];

  return (
    <div className="py-10 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#786B62] mb-8">
          <Link href="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/cakes" className="hover:text-amber-800 transition-colors">
            Cakes
          </Link>
          <span>/</span>
          <span className="text-[#221610] font-semibold">{product.name}</span>
        </nav>

        {/* Product Detail Interactive Component */}
        <ProductDetailClient
          product={product}
          addons={addons}
          reviews={reviews}
          relatedProducts={relatedProducts.filter((p) => p.id !== product.id)}
        />
      </div>
    </div>
  );
}
