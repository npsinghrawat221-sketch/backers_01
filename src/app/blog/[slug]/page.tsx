import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Sparkles, Cake } from "@/components/icons";
import { formatDate, formatINR } from "@/lib/utils";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.seoTitle || `${post.title} | Velvet & Crumb Blog`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  const featuredCakes = await db.product.findMany({ take: 3 });

  const articleSchema = getArticleSchema(post);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#786B62]">
          <Link href="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-amber-800 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#221610] font-semibold line-clamp-1">{post.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#786B62]">
            <span className="bg-amber-100/80 text-amber-950 font-bold px-3 py-1 rounded-full">
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              {formatDate(post.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#221610] tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-[#786B62] leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-amber-50">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Markdown-style Content Body */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EBDCCB] shadow-xs space-y-6 text-[#221610] leading-relaxed text-sm sm:text-base">
          <div className="space-y-6 whitespace-pre-line font-sans">
            {post.content}
          </div>

          {/* Interactive CTA Box inside article */}
          <div className="mt-10 p-6 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#221610]">
                Planning a milestone celebration?
              </h3>
              <p className="text-xs text-[#786B62] mt-0.5">
                Customize your flavor, tiers, and reference image with our cake artists.
              </p>
            </div>
            <Link
              href="/custom-cakes"
              className="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors shrink-0"
            >
              Open Cake Builder →
            </Link>
          </div>
        </div>

        {/* Related Featured Cakes */}
        <div className="space-y-6 pt-6 border-t border-[#EBDCCB]">
          <h3 className="font-serif-heading text-2xl font-bold text-[#221610]">
            Fresh Bakes Mentioned in This Guide
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredCakes.map((cake) => (
              <div
                key={cake.id}
                className="rounded-3xl bg-white border border-[#EBDCCB] shadow-xs overflow-hidden"
              >
                <div className="relative aspect-square w-full bg-amber-50">
                  <Image
                    src={cake.images[0]?.url || "/placeholder-cake.jpg"}
                    alt={cake.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-[#221610] line-clamp-1">{cake.name}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-sm text-amber-900">{formatINR(cake.basePrice)}</span>
                    <Link
                      href={`/cakes/${cake.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
