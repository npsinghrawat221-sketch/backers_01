# Velvet & Crumb Artisanal Bakery & Patisserie 🎂

A production-ready, modern SEO-optimized e-commerce platform and custom cake studio for an artisanal bakery business. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Prisma ORM**, and **Razorpay**.

Designed for high local search visibility, same-day & midnight doorstep delivery, interactive custom tiered cake inquiries, and a comprehensive operations management dashboard.

---

## 🌟 Key Features

### 🛒 1. Customer Storefront & Catalog
- **Artisanal Aesthetics**: Warm ivory, deep roast cocoa, amber honey, and rose glaze palette with Google fonts (*Plus Jakarta Sans* & *Playfair Display*).
- **Catalogue & Search**: Debounced live search modal (⌘K), dietary filters (100% Eggless vs Standard), occasion tabs, and price sorting.
- **Product Detail Experience**: Multi-image interactive gallery, dynamic size & weight switcher (0.5kg, 1kg, 1.5kg, 2kg) with instant price recalculation, personalized chocolate plaque message input, party celebration add-ons, and real-time Bangalore pincode checker.
- **Customer Reviews**: Verified buyer ratings and reviews submission form with 5-star badges.

### 🎂 2. Multi-Step Custom Cake Builder (`/custom-cakes`)
- **Step 1: Occasion Selection**: Birthdays, Weddings, Anniversaries, Baby Showers, Engagements, Corporate Galas.
- **Step 2: Flavor & Sponge**: Belgian Dark Chocolate, Red Velvet Cream Cheese, Mango Passion Fruit, Pistachio Rose Tres Leches, Salted Caramel Butterscotch.
- **Step 3: Size & Tiers**: 0.5kg to 3-Tier (5.0kg+) with live servings calculator and 100% Eggless toggle.
- **Step 4: Design & Reference Photo**: Drag-and-drop reference photo upload with instant preview and signature aesthetic style gallery.
- **Step 5: Personalization**: Custom plaque message, theme color palette, special toppers, recipient name & milestone age.
- **Step 6: Schedule & Logistics**: Delivery date picker, time slot selector (Morning, Afternoon, Evening, Midnight Surprise), Doorstep Delivery vs Koramangala Studio Pickup.
- **Step 7: Instant Quotation & WhatsApp Sync**: Dynamic price estimation engine with one-click pre-filled quotation sync to WhatsApp.

### 🛍️ 3. Cart, Checkout & Payments
- **Slide-out Cart Drawer & Cart Page**: Real-time price breakdown, free delivery progress meter (unlocks at ₹799), and coupon code validator (`WELCOME10`, `FLAT100`, `SWEETCELEBRATE`).
- **Checkout**: Delivery address validation, landmark, delivery slot scheduler, and Cash on Delivery / Razorpay online payment integration.
- **Celebration Confirmation**: Animated celebratory confetti, unique order code (`BAK-2026-XXXX`), printable receipt, and WhatsApp order tracking updates.

### 🚚 4. Live Order Tracking (`/track-order`)
- Track by Order ID (`BAK-2026-XXXX`) and phone number.
- 7-Stage visual milestone timeline:
  `Order Placed` $\to$ `Payment Confirmed` $\to$ `Order Accepted` $\to$ `Baking & Preparing` $\to$ `Packaged & Ready` $\to$ `Out for Delivery` $\to$ `Delivered`.
- Real-time status refresh, direct driver/studio calling, and WhatsApp support.

### 👨‍🍳 5. Admin Management Dashboard (`/admin`)
- **Dashboard Overview**: Daily/monthly sales revenue, active oven preparation queue, pending custom cake inquiries, and catalog metrics.
- **Orders Management**: One-click stage progression (`Accepted` $\to$ `Preparing` $\to$ `Ready` $\to$ `Out for Delivery` $\to$ `Delivered`), payment status updates, detailed packing slip viewer.
- **Custom Cake Inquiries**: Review customer reference photos, enter official quotation prices, add chef notes, and trigger instant WhatsApp quotes to clients.
- **Product & Category CRUD**: Add/delete cakes, manage weight variants, prices, and eggless badges.
- **Coupons & Review Moderation**: Create promotional coupons and feature verified 5-star customer reviews on the homepage.

### 🚀 6. Technical & Local SEO
- Next.js Metadata API with OpenGraph and Twitter cards.
- Rich JSON-LD Schemas:
  - `Bakery` / `LocalBusiness` Schema with geo-coordinates, opening hours, address, and menu URL.
  - `Product` Schema with rating, aggregateRating, price, and availability.
  - `BreadcrumbList` Schema across all routes.
  - `FAQPage` Schema with interactive accordion.
  - `BlogPosting` Schema for bakery articles.
- Dynamic `/sitemap.xml` and `/robots.txt`.
- Dedicated `/locations` page targeting Bangalore neighborhoods (Koramangala, Indiranagar, HSR Layout, Whitefield, Bellandur, Jayanagar, etc.) with embedded Google Maps.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14/15 App Router |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom Design System Tokens |
| **Animations** | Framer Motion & Canvas Confetti |
| **Icons** | Lucide React |
| **Database & ORM** | Prisma ORM with SQLite (or PostgreSQL) |
| **Payments** | Razorpay (with Demo Test Mode fallback) |
| **State** | React Context (Cart, Toast, Notifications) with LocalStorage Sync |

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: Live Razorpay credentials (if omitted, runs in demo test mode)
RAZORPAY_KEY_ID="rzp_test_yourKeyHere"
RAZORPAY_KEY_SECRET="yourSecretHere"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Admin Credentials

To access the Admin Management Portal:
- **URL**: `/admin`
- **Default Admin Email**: `admin@bakery.com`
- **Default Admin Password**: `admin123`

---

## 📁 Project Architecture

```
bakers/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout with SEO schemas & providers
│   │   ├── page.tsx                # Artisanal Homepage
│   │   ├── globals.css             # Bakery Design System & Tokens
│   │   ├── sitemap.ts              # Dynamic XML Sitemap Generator
│   │   ├── robots.ts               # Robots.txt Configuration
│   │   ├── cakes/
│   │   │   ├── page.tsx            # Cake Catalog with Facet Filters
│   │   │   └── [slug]/page.tsx     # Product Detail & Reviews Page
│   │   ├── custom-cakes/           # 7-Step Interactive Custom Cake Builder
│   │   ├── cart/                   # Shopping Cart & Coupon Redemption
│   │   ├── checkout/               # Schedule & Razorpay / COD Checkout
│   │   ├── order-success/[orderId] # Order Confirmation & Printable Invoice
│   │   ├── track-order/            # Live 7-Stage Milestone Order Tracker
│   │   ├── locations/              # Local SEO & Bangalore Delivery Hubs
│   │   ├── blog/                   # SEO Guides & Baking Articles
│   │   ├── admin/                  # Operations Dashboard & Management
│   │   └── api/                    # API Route Handlers (Products, Orders, Custom Cakes, Coupons, Reviews, Payments)
│   ├── components/                 # Reusable UI & Feature Components
│   ├── config/site.ts              # Centralized Business & Bakery Configuration
│   ├── context/                    # Cart & Toast Notification Contexts
│   ├── data/seed-data.ts           # Rich Seed Catalog (25+ cakes, reviews, coupons)
│   ├── lib/                        # Database Service, Utilities, and SEO Generators
│   └── types/                      # TypeScript Database & Entity Interfaces
└── prisma/
    ├── schema.prisma               # Prisma Database Models
    └── seed.ts                     # Database Seeding Script
```

---

## 🍰 Business Customization

All bakery details are centrally managed in `src/config/site.ts`:
- Bakery Name & Tagline
- Contact Phone & WhatsApp Number
- Physical Address & Google Maps Coordinates
- Opening Hours
- Delivery Fees & Free Shipping Thresholds
- Delivery Time Slots
- Social Media Links
