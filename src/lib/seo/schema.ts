import { siteConfig } from "@/config/site";
import { Product, BlogPost } from "@/types/database";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${siteConfig.url}/#bakery`,
    name: siteConfig.name,
    legalName: siteConfig.fssai?.registeredName || siteConfig.name,
    founder: {
      "@type": "Person",
      name: siteConfig.fssai?.registeredName || "Laxmin Rawat",
    },
    image: [siteConfig.ogImage],
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    url: siteConfig.url,
    priceRange: "₹₹",
    servesCuisine: ["Bakery", "Patisserie", "100% Eggless Cakes", "Fresh Fruit Cakes"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.coordinates.latitude,
      longitude: siteConfig.address.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.openingHours.schemaDays,
        opens: siteConfig.openingHours.schemaOpens,
        closes: siteConfig.openingHours.schemaCloses,
      },
    ],
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.youtube,
    ],
    hasMenu: `${siteConfig.url}/cakes`,
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking, Razorpay",
    identifier: siteConfig.fssai
      ? {
          "@type": "PropertyValue",
          name: "FSSAI Registration ID",
          value: siteConfig.fssai.licenseNumber,
        }
      : undefined,
  };
}

export function getProductSchema(product: Product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.shortDesc || product.description,
    sku: `BAK-${product.id}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.shortName,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/cakes/${product.slug}`,
      priceCurrency: siteConfig.currency.code,
      price: product.basePrice,
      availability:
        product.stockStatus === "OUT_OF_STOCK"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: Math.max(1, product.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}
