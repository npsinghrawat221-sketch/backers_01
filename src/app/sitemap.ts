import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, posts] = await Promise.all([
    db.product.findMany(),
    db.category.findMany(),
    db.blogPost.findMany({ where: { isPublished: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/cakes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/custom-cakes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/track-order`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.7,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/cakes/${product.slug}`,
    lastModified: new Date(product.updatedAt || product.createdAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
