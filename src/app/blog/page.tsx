import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Clock, User, ArrowRight, BookOpen, Sparkles } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Bakery Stories, Cake Guides & Recipes | Velvet & Crumb",
  description:
    "Expert baking tips from master pastry chefs: how to choose birthday cake flavors, secrets of fluffy eggless baking, and 2026 custom cake design trends.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({ where: { isPublished: true } });

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Bakery Blog", url: `${siteConfig.url}/blog` },
  ];

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#786B62]">
          <Link href="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#221610] font-semibold">Bakery Stories &amp; Guides</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Master Pastry Insights</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#221610] tracking-tight">
            Bakery Stories &amp; Celebration Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#786B62]">
            Discover tips on choosing party cake sizes, flavor pairings, eggless baking secrets, and custom cake trends.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl bg-white border border-[#EBDCCB] shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between card-hover-lift"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="relative aspect-16/10 block w-full bg-amber-50 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#786B62]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif-heading text-xl font-bold text-[#221610] group-hover:text-amber-800 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#786B62] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EBDCCB]/60 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#221610]">
                  By {post.author}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-amber-800 group-hover:text-amber-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
