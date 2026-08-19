export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  role: "ADMIN" | "CUSTOMER";
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  weightKg: number;
  price: number;
  servings: string;
  inStock: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  basePrice: number;
  isEggless: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isSpecial: boolean;
  rating: number;
  reviewCount: number;
  ingredients?: string;
  allergens?: string;
  preparationTime: string;
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  inStock: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  variantId?: string;
  variantName?: string;
  weightKg?: number;
  unitPrice: number;
  quantity: number;
  cakeMessage?: string;
  eggless: boolean;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryType: "DELIVERY" | "PICKUP";
  address?: string;
  landmark?: string;
  city: string;
  postalCode?: string;
  deliveryDate: string;
  deliverySlot: string;
  cakeMessage?: string;
  orderNotes?: string;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  tax: number;
  total: number;
  status:
    | "PLACED"
    | "PAYMENT_CONFIRMED"
    | "ACCEPTED"
    | "PREPARING"
    | "READY"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: "RAZORPAY" | "COD" | "STORE_PICKUP";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomCakeRequest {
  id: string;
  inquiryNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerWhatsapp?: string;
  occasion: string;
  flavor: string;
  tierSizeKg: string;
  servingsEstimate?: string;
  referenceImageUrl?: string;
  designNotes?: string;
  cakeMessage?: string;
  themeColor?: string;
  toppings?: string;
  nameOnCake?: string;
  ageOnCake?: string;
  isEggless: boolean;
  deliveryDate: string;
  deliverySlot: string;
  deliveryType: "DELIVERY" | "PICKUP";
  address?: string;
  estimatedPriceMin?: number;
  estimatedPriceMax?: number;
  quotationPrice?: number;
  adminNotes?: string;
  status:
    | "PENDING"
    | "REVIEWING"
    | "QUOTATION_SENT"
    | "CUSTOMER_APPROVED"
    | "PREPARING"
    | "READY"
    | "DELIVERED"
    | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId?: string;
  customerName: string;
  rating: number;
  title?: string;
  comment: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  validUntil?: string;
  isActive: boolean;
  usageCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "ORDER" | "CUSTOM_CAKE" | "REVIEW";
  isRead: boolean;
  link?: string;
  createdAt: string;
}
