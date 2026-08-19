import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { getLocalBusinessSchema } from "@/lib/seo/schema";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | 100% Eggless Home Bakery & Fresh Fruit Cakes`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "honey bunny bakers",
    "honey_bunny_homebakers",
    "100% eggless bakery greater noida",
    "fresh fruit cake greater noida",
    "home bakery purvanchal silver city 2",
    "custom cakes greater noida pi 2",
    "designer birthday cake greater noida",
    "cake delivery pari chowk greater noida",
    "eggless cake shop greater noida",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Artisanal Bakery`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#FAF7F2] text-[#221610]"
      >
        <ToastProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <FloatingCTA />
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
