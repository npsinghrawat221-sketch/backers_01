import React from "react";
import { db } from "@/lib/db";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedCakes } from "@/components/home/FeaturedCakes";
import { CustomCakeBanner } from "@/components/home/CustomCakeBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { DeliveryMapSection } from "@/components/home/DeliveryMapSection";
import { FAQSection } from "@/components/home/FAQSection";

export const revalidate = 60; // ISR revalidation every 60s

export default async function HomePage() {
  const [categories, products, reviews] = await Promise.all([
    db.category.findMany({ where: { isActive: true } }),
    db.product.findMany(),
    db.review.findMany({ where: { isFeatured: true, isApproved: true } }),
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Cake Categories */}
      <CategoryGrid categories={categories} />

      {/* 3. Bestsellers & Featured Cakes */}
      <FeaturedCakes products={products} />

      {/* 4. Bespoke Custom Cake Studio Banner */}
      <CustomCakeBanner />

      {/* 5. The Velvet & Crumb Difference */}
      <WhyChooseUs />

      {/* 6. Verified Customer Testimonials */}
      <CustomerReviews reviews={reviews} />

      {/* 7. Instagram & Patisserie Gallery */}
      <InstagramGallery />

      {/* 8. Delivery Areas & Interactive Map */}
      <DeliveryMapSection />

      {/* 9. Interactive FAQs */}
      <FAQSection />
    </div>
  );
}
