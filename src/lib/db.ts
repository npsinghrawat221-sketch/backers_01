import fs from "fs";
import path from "path";
import {
  Category,
  Product,
  ProductAddon,
  Coupon,
  BlogPost,
  Order,
  CustomCakeRequest,
  Review,
  Notification,
  User,
} from "@/types/database";
import {
  initialUsers,
  initialCategories,
  initialProducts,
  initialAddons,
  initialCoupons,
  initialReviews,
  initialBlogPosts,
  initialOrders,
  initialCustomCakeRequests,
  initialNotifications,
} from "@/data/seed-data";

interface DatabaseState {
  users: User[];
  categories: Category[];
  products: Product[];
  addons: ProductAddon[];
  coupons: Coupon[];
  reviews: Review[];
  blogPosts: BlogPost[];
  orders: Order[];
  customCakeRequests: CustomCakeRequest[];
  notifications: Notification[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function loadDatabase(): DatabaseState {
  try {
    if (typeof window === "undefined" && fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      const parsed: DatabaseState = JSON.parse(data);
      // Ensure product catalog always uses the latest official menu rates
      parsed.products = initialProducts;
      return parsed;
    }
  } catch (error) {
    console.error("Error reading database file, using initial data:", error);
  }

  const defaultState: DatabaseState = {
    users: initialUsers,
    categories: initialCategories,
    products: initialProducts,
    addons: initialAddons,
    coupons: initialCoupons,
    reviews: initialReviews,
    blogPosts: initialBlogPosts,
    orders: initialOrders,
    customCakeRequests: initialCustomCakeRequests,
    notifications: initialNotifications,
  };

  try {
    if (typeof window === "undefined") {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultState, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error creating initial DB file:", err);
  }

  return defaultState;
}

let inMemoryState: DatabaseState = loadDatabase();

function persistDatabase(): void {
  try {
    if (typeof window === "undefined") {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryState, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error persisting database:", err);
  }
}

export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      inMemoryState = loadDatabase();
      return (
        inMemoryState.users.find(
          (u) =>
            (where.email && u.email.toLowerCase() === where.email.toLowerCase()) ||
            (where.id && u.id === where.id)
        ) || null
      );
    },
    findMany: async () => {
      inMemoryState = loadDatabase();
      return inMemoryState.users;
    },
  },

  category: {
    findMany: async (options?: { where?: { isActive?: boolean } }) => {
      inMemoryState = loadDatabase();
      let list = inMemoryState.categories;
      if (options?.where?.isActive !== undefined) {
        list = list.filter((c) => c.isActive === options.where!.isActive);
      }
      return list.sort((a, b) => a.order - b.order);
    },
    findUnique: async ({ where }: { where: { slug?: string; id?: string } }) => {
      inMemoryState = loadDatabase();
      return (
        inMemoryState.categories.find(
          (c) =>
            (where.slug && c.slug === where.slug) ||
            (where.id && c.id === where.id)
        ) || null
      );
    },
    create: async ({ data }: { data: Omit<Category, "id" | "createdAt" | "updatedAt"> }) => {
      inMemoryState = loadDatabase();
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      inMemoryState.categories.push(newCategory);
      persistDatabase();
      return newCategory;
    },
  },

  product: {
    findMany: async (options?: {
      where?: {
        categoryId?: string;
        categorySlug?: string;
        isEggless?: boolean;
        isBestseller?: boolean;
        isFeatured?: boolean;
        isSpecial?: boolean;
        search?: string;
      };
      orderBy?: { [key: string]: "asc" | "desc" };
      take?: number;
    }) => {
      inMemoryState = loadDatabase();
      let list = [...inMemoryState.products];

      // populate categories
      list = list.map((p) => ({
        ...p,
        category: inMemoryState.categories.find((c) => c.id === p.categoryId),
      }));

      if (options?.where) {
        const { categoryId, categorySlug, isEggless, isBestseller, isFeatured, isSpecial, search } =
          options.where;
        if (categoryId) {
          list = list.filter((p) => p.categoryId === categoryId);
        }
        if (categorySlug) {
          const cat = inMemoryState.categories.find((c) => c.slug === categorySlug);
          if (cat) {
            list = list.filter((p) => p.categoryId === cat.id);
          }
        }
        if (isEggless !== undefined) {
          list = list.filter((p) => p.isEggless === isEggless);
        }
        if (isBestseller !== undefined) {
          list = list.filter((p) => p.isBestseller === isBestseller);
        }
        if (isFeatured !== undefined) {
          list = list.filter((p) => p.isFeatured === isFeatured);
        }
        if (isSpecial !== undefined) {
          list = list.filter((p) => p.isSpecial === isSpecial);
        }
        if (search && search.trim() !== "") {
          const q = search.toLowerCase();
          list = list.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.shortDesc.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              (p.seoKeywords && p.seoKeywords.toLowerCase().includes(q))
          );
        }
      }

      if (options?.take) {
        list = list.slice(0, options.take);
      }

      return list;
    },
    findUnique: async ({ where }: { where: { slug?: string; id?: string } }) => {
      inMemoryState = loadDatabase();
      const product = inMemoryState.products.find(
        (p) =>
          (where.slug && p.slug === where.slug) ||
          (where.id && p.id === where.id)
      );
      if (!product) return null;

      return {
        ...product,
        category: inMemoryState.categories.find((c) => c.id === product.categoryId),
      };
    },
    create: async ({ data }: { data: Omit<Product, "id" | "createdAt" | "updatedAt"> }) => {
      inMemoryState = loadDatabase();
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      inMemoryState.products.push(newProduct);
      persistDatabase();
      return newProduct;
    },
    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<Product>;
    }) => {
      inMemoryState = loadDatabase();
      const index = inMemoryState.products.findIndex((p) => p.id === where.id);
      if (index === -1) throw new Error("Product not found");
      inMemoryState.products[index] = {
        ...inMemoryState.products[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      persistDatabase();
      return inMemoryState.products[index];
    },
    delete: async ({ where }: { where: { id: string } }) => {
      inMemoryState = loadDatabase();
      inMemoryState.products = inMemoryState.products.filter((p) => p.id !== where.id);
      persistDatabase();
      return true;
    },
  },

  addon: {
    findMany: async () => {
      inMemoryState = loadDatabase();
      return inMemoryState.addons.filter((a) => a.inStock);
    },
  },

  order: {
    findMany: async (options?: { where?: { userId?: string; status?: string } }) => {
      inMemoryState = loadDatabase();
      let list = [...inMemoryState.orders];
      if (options?.where?.userId) {
        list = list.filter((o) => o.userId === options.where!.userId);
      }
      if (options?.where?.status) {
        list = list.filter((o) => o.status === options.where!.status);
      }
      return list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    findUnique: async ({
      where,
    }: {
      where: { id?: string; orderNumber?: string };
    }) => {
      inMemoryState = loadDatabase();
      return (
        inMemoryState.orders.find(
          (o) =>
            (where.id && o.id === where.id) ||
            (where.orderNumber &&
              o.orderNumber.toUpperCase() === where.orderNumber.toUpperCase())
        ) || null
      );
    },
    create: async ({ data }: { data: Omit<Order, "id" | "createdAt" | "updatedAt"> }) => {
      inMemoryState = loadDatabase();
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      inMemoryState.orders.unshift(newOrder);

      // Create notification
      const notif: Notification = {
        id: `notif-${Date.now()}`,
        title: "New Cake Order Received!",
        message: `Order #${newOrder.orderNumber} for ₹${newOrder.total.toLocaleString("en-IN")} from ${newOrder.customerName}`,
        type: "ORDER",
        isRead: false,
        link: "/admin/orders",
        createdAt: new Date().toISOString(),
      };
      inMemoryState.notifications.unshift(notif);

      persistDatabase();
      return newOrder;
    },
    update: async ({
      where,
      data,
    }: {
      where: { id?: string; orderNumber?: string };
      data: Partial<Order>;
    }) => {
      inMemoryState = loadDatabase();
      const index = inMemoryState.orders.findIndex(
        (o) =>
          (where.id && o.id === where.id) ||
          (where.orderNumber &&
            o.orderNumber.toUpperCase() === where.orderNumber.toUpperCase())
      );
      if (index === -1) throw new Error("Order not found");
      inMemoryState.orders[index] = {
        ...inMemoryState.orders[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      persistDatabase();
      return inMemoryState.orders[index];
    },
  },

  customCakeRequest: {
    findMany: async (options?: { where?: { status?: string } }) => {
      inMemoryState = loadDatabase();
      let list = [...inMemoryState.customCakeRequests];
      if (options?.where?.status) {
        list = list.filter((r) => r.status === options.where!.status);
      }
      return list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    findUnique: async ({
      where,
    }: {
      where: { id?: string; inquiryNumber?: string };
    }) => {
      inMemoryState = loadDatabase();
      return (
        inMemoryState.customCakeRequests.find(
          (r) =>
            (where.id && r.id === where.id) ||
            (where.inquiryNumber &&
              r.inquiryNumber.toUpperCase() === where.inquiryNumber.toUpperCase())
        ) || null
      );
    },
    create: async ({
      data,
    }: {
      data: Omit<CustomCakeRequest, "id" | "createdAt" | "updatedAt">;
    }) => {
      inMemoryState = loadDatabase();
      const newRequest: CustomCakeRequest = {
        id: `cc-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      inMemoryState.customCakeRequests.unshift(newRequest);

      // Create admin notification
      const notif: Notification = {
        id: `notif-${Date.now()}`,
        title: "New Custom Cake Quotation Request!",
        message: `Inquiry #${newRequest.inquiryNumber} for ${newRequest.occasion} (${newRequest.tierSizeKg}) from ${newRequest.customerName}`,
        type: "CUSTOM_CAKE",
        isRead: false,
        link: "/admin/custom-cakes",
        createdAt: new Date().toISOString(),
      };
      inMemoryState.notifications.unshift(notif);

      persistDatabase();
      return newRequest;
    },
    update: async ({
      where,
      data,
    }: {
      where: { id?: string; inquiryNumber?: string };
      data: Partial<CustomCakeRequest>;
    }) => {
      inMemoryState = loadDatabase();
      const index = inMemoryState.customCakeRequests.findIndex(
        (r) =>
          (where.id && r.id === where.id) ||
          (where.inquiryNumber &&
            r.inquiryNumber.toUpperCase() === where.inquiryNumber.toUpperCase())
      );
      if (index === -1) throw new Error("Custom cake inquiry not found");
      inMemoryState.customCakeRequests[index] = {
        ...inMemoryState.customCakeRequests[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      persistDatabase();
      return inMemoryState.customCakeRequests[index];
    },
  },

  review: {
    findMany: async (options?: { where?: { productId?: string; isApproved?: boolean; isFeatured?: boolean } }) => {
      inMemoryState = loadDatabase();
      let list = [...inMemoryState.reviews];
      if (options?.where?.productId) {
        list = list.filter((r) => r.productId === options.where!.productId);
      }
      if (options?.where?.isApproved !== undefined) {
        list = list.filter((r) => r.isApproved === options.where!.isApproved);
      }
      if (options?.where?.isFeatured !== undefined) {
        list = list.filter((r) => r.isFeatured === options.where!.isFeatured);
      }
      return list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    create: async ({ data }: { data: Omit<Review, "id" | "createdAt"> }) => {
      inMemoryState = loadDatabase();
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...data,
      };
      inMemoryState.reviews.unshift(newReview);
      persistDatabase();
      return newReview;
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<Review> }) => {
      inMemoryState = loadDatabase();
      const index = inMemoryState.reviews.findIndex((r) => r.id === where.id);
      if (index === -1) throw new Error("Review not found");
      inMemoryState.reviews[index] = { ...inMemoryState.reviews[index], ...data };
      persistDatabase();
      return inMemoryState.reviews[index];
    },
  },

  coupon: {
    findMany: async () => {
      inMemoryState = loadDatabase();
      return inMemoryState.coupons;
    },
    findUnique: async ({ where }: { where: { code: string } }) => {
      inMemoryState = loadDatabase();
      return (
        inMemoryState.coupons.find(
          (c) => c.code.toUpperCase() === where.code.toUpperCase()
        ) || null
      );
    },
    create: async ({ data }: { data: Omit<Coupon, "id"> }) => {
      inMemoryState = loadDatabase();
      const newCoupon: Coupon = {
        id: `coup-${Date.now()}`,
        ...data,
      };
      inMemoryState.coupons.push(newCoupon);
      persistDatabase();
      return newCoupon;
    },
    update: async ({ where, data }: { where: { code: string }; data: Partial<Coupon> }) => {
      inMemoryState = loadDatabase();
      const index = inMemoryState.coupons.findIndex(
        (c) => c.code.toUpperCase() === where.code.toUpperCase()
      );
      if (index === -1) throw new Error("Coupon not found");
      inMemoryState.coupons[index] = { ...inMemoryState.coupons[index], ...data };
      persistDatabase();
      return inMemoryState.coupons[index];
    },
  },

  blogPost: {
    findMany: async (options?: { where?: { isPublished?: boolean } }) => {
      inMemoryState = loadDatabase();
      let list = inMemoryState.blogPosts;
      if (options?.where?.isPublished !== undefined) {
        list = list.filter((b) => b.isPublished === options.where!.isPublished);
      }
      return list.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },
    findUnique: async ({ where }: { where: { slug: string } }) => {
      inMemoryState = loadDatabase();
      return inMemoryState.blogPosts.find((b) => b.slug === where.slug) || null;
    },
  },

  notification: {
    findMany: async (options?: { where?: { isRead?: boolean } }) => {
      inMemoryState = loadDatabase();
      let list = inMemoryState.notifications;
      if (options?.where?.isRead !== undefined) {
        list = list.filter((n) => n.isRead === options.where!.isRead);
      }
      return list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    markAllRead: async () => {
      inMemoryState = loadDatabase();
      inMemoryState.notifications = inMemoryState.notifications.map((n) => ({
        ...n,
        isRead: true,
      }));
      persistDatabase();
      return true;
    },
  },
};

export default db;
