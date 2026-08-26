import { PrismaClient } from "../src/generated/prisma";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting bakery database seeding...");

  // 1. Clean existing records
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customCakeRequest.deleteMany();
  await prisma.productAddon.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admin & Test Users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@bakery.com",
      passwordHash: adminPassword,
      name: "Master Pastry Chef Pierre",
      phone: "+919876543210",
      role: "ADMIN",
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: "priya.sharma@example.com",
      passwordHash: customerPassword,
      name: "Priya Sharma",
      phone: "+919812345678",
      role: "CUSTOMER",
    },
  });

  console.log("👤 Created users:", admin.email, customer.email);

  // 3. Create Categories
  const categoriesData = [
    {
      slug: "birthday-cakes",
      name: "Birthday Cakes",
      description: "Spectacular handcrafted birthday cakes with vibrant designs and rich flavors.",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
      icon: "Cake",
      order: 1,
    },
    {
      slug: "custom-cakes",
      name: "Custom & Designer Cakes",
      description: "Bespoke tiered cakes tailored to your dreams, themes, and celebrations.",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
      icon: "Sparkles",
      order: 2,
    },
    {
      slug: "chocolate-cakes",
      name: "Chocolate Indulgence",
      description: "Decadent Belgian dark chocolate truffles, mousses, and rich fudge cakes.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
      icon: "Heart",
      order: 3,
    },
    {
      slug: "red-velvet-cakes",
      name: "Red Velvet Delights",
      description: "Silky crimson velvet sponge layered with authentic Philadelphia cream cheese frosting.",
      image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop",
      icon: "Flame",
      order: 4,
    },
    {
      slug: "fruit-cakes",
      name: "Fresh Fruit & Exotic Cakes",
      description: "Topped with farm-fresh Alphonso mangoes, berries, kiwis, and exotic seasonal fruits.",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
      icon: "Apple",
      order: 5,
    },
    {
      slug: "wedding-anniversary",
      name: "Wedding & Anniversary Cakes",
      description: "Elegant multi-tier masterpieces finished with floral accents and gold leaf accents.",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop",
      icon: "Gem",
      order: 6,
    },
    {
      slug: "cupcakes-pastries",
      name: "Cupcakes & Pastries",
      description: "Individual artisan pastry slices and decorative cupcake boxes for sweet cravings.",
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=800&auto=format&fit=crop",
      icon: "Coffee",
      order: 7,
    },
    {
      slug: "brownies-cookies",
      name: "Brownies & Cookies",
      description: "Gooey chocolate walnut brownies, chewy cookies, and handcrafted tea-time bakes.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
      icon: "Cookie",
      order: 8,
    },
    {
      slug: "gift-hampers",
      name: "Gift Hampers & Treat Boxes",
      description: "Curated artisanal gift boxes filled with cookies, brownies, macarons, and festive treats.",
      image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=800&auto=format&fit=crop",
      icon: "Gift",
      order: 9,
    },
  ];

  const categoryMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }

  console.log("📂 Created categories:", categoryMap.size);

  // 4. Create Rich Products with Variants & Images
  const products = [
    {
      slug: "belgian-dark-chocolate-truffle-cake",
      name: "Signature Belgian Dark Chocolate Truffle Cake",
      shortDesc: "Rich 70% dark Belgian chocolate ganache layered with moist cocoa sponge.",
      description:
        "Our best-selling signature creation. Made with premium 70% imported Belgian chocolate, silky chocolate ganache, and melt-in-the-mouth cocoa sponge. Finished with handcrafted chocolate curls and edible 24k gold leaf shimmer. Perfect for birthdays, romantic evenings, and true chocolate connoisseurs.",
      basePrice: 699,
      isEggless: true,
      isBestseller: true,
      isFeatured: true,
      isSpecial: false,
      rating: 4.95,
      reviewCount: 142,
      ingredients: "70% Belgian Dark Chocolate, Dutch Process Cocoa, Organic Flour, Unsalted Butter, Dairy Cream, Madagascar Vanilla",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "2-3 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "chocolate-cakes",
      seoTitle: "Belgian Dark Chocolate Truffle Cake | Order Online Bangalore",
      seoDescription: "Order the best Belgian Dark Chocolate Truffle Cake in Bangalore. 100% eggless, rich ganache, same day & midnight delivery.",
      seoKeywords: "belgian chocolate cake, dark chocolate truffle cake, eggless chocolate cake bangalore, best chocolate cake",
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 699, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1299, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 1899, servings: "14-18 Servings" },
        { name: "2.0 kg", weightKg: 2.0, price: 2499, servings: "20-24 Servings" },
      ],
    },
    {
      slug: "classic-red-velvet-cream-cheese-cake",
      name: "Classic Red Velvet Cream Cheese Cake",
      shortDesc: "Vibrant scarlet velvet sponge paired with authentic Philadelphia cream cheese.",
      description:
        "An iconic luxury classic. Layers of crimson buttermilk sponge with a delicate hint of cocoa, filled and frosted with tangy-sweet Philadelphia cream cheese frosting. Garnished with velvety red sponge crumbs and white chocolate pearls.",
      basePrice: 749,
      isEggless: true,
      isBestseller: true,
      isFeatured: true,
      isSpecial: true,
      rating: 4.92,
      reviewCount: 98,
      ingredients: "Philadelphia Cream Cheese, Pure Vanilla Bean, Organic Flour, Cocoa Powder, Pure Cane Sugar, Cultured Buttermilk",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "3-4 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "red-velvet-cakes",
      seoTitle: "Classic Red Velvet Cake with Cream Cheese | Velvet & Crumb",
      seoDescription: "Order decadent eggless Red Velvet Cake with authentic cream cheese frosting in Bangalore. Freshly baked daily.",
      seoKeywords: "red velvet cake, cream cheese red velvet, eggless red velvet cake bangalore, anniversary cake",
      images: [
        "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 749, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1399, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 1999, servings: "14-18 Servings" },
        { name: "2.0 kg", weightKg: 2.0, price: 2599, servings: "20-24 Servings" },
      ],
    },
    {
      slug: "fresh-exotic-fruit-gateau-cake",
      name: "Fresh Exotic Fruit & Vanilla Gateau",
      shortDesc: "Light vanilla sponge infused with real fruit coulis, topped with seasonal fruits.",
      description:
        "Fresh, vibrant, and bursting with tropical flavor. Fluffy vanilla chiffon sponge layered with light dairy mousse and diced kiwi, strawberries, dragon fruit, and Ratnagiri Alphonso mangoes. Glazed with a light citrus shine.",
      basePrice: 699,
      isEggless: true,
      isBestseller: true,
      isFeatured: false,
      isSpecial: true,
      rating: 4.88,
      reviewCount: 76,
      ingredients: "Seasonal Fresh Fruits, Madagascar Vanilla, Whipped Dairy Cream, Sponge Cake, Fruit Glaze",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "2-3 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "fruit-cakes",
      seoTitle: "Fresh Exotic Fruit Cake | Same Day Delivery Bangalore",
      seoDescription: "Loaded with fresh seasonal fruits and light vanilla cream. Order delicious eggless fruit cake online.",
      seoKeywords: "fresh fruit cake, eggless fruit cake, mango cake, strawberry fruit gateau",
      images: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 699, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1299, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 1899, servings: "14-18 Servings" },
        { name: "2.0 kg", weightKg: 2.0, price: 2499, servings: "20-24 Servings" },
      ],
    },
    {
      slug: "salted-caramel-butterscotch-crunch-cake",
      name: "Salted Caramel Butterscotch Crunch Cake",
      shortDesc: "House-made salted caramel drizzle with crunchy butterscotch praline and soft sponge.",
      description:
        "A symphony of golden caramel and crunch. Layers of vanilla sponge infused with slow-simmered artisanal salted caramel, sprinkled with homemade cashew butterscotch praline and whipped cream.",
      basePrice: 649,
      isEggless: true,
      isBestseller: false,
      isFeatured: true,
      isSpecial: false,
      rating: 4.89,
      reviewCount: 54,
      ingredients: "Artisanal Salted Caramel, Cashew Praline, Dairy Cream, Vanilla Sponge, Sea Salt Flakes",
      allergens: "Contains Nuts (Cashews), Dairy & Gluten. 100% Eggless.",
      preparationTime: "2-3 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "birthday-cakes",
      seoTitle: "Salted Caramel Butterscotch Crunch Cake | Order Online",
      seoDescription: "Indulge in delicious Butterscotch Salted Caramel Cake with homemade cashew praline.",
      seoKeywords: "butterscotch cake, salted caramel cake, eggless butterscotch cake, crunch cake",
      images: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 649, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1199, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 1749, servings: "14-18 Servings" },
        { name: "2.0 kg", weightKg: 2.0, price: 2299, servings: "20-24 Servings" },
      ],
    },
    {
      slug: "vintage-lambeth-piped-celebration-cake",
      name: "Vintage Lambeth Victorian Piped Cake",
      shortDesc: "Trendy aesthetic pastel piped cake with intricate Victorian ruffles and cherries.",
      description:
        "The trending Instagram sensation! Hand-piped using traditional Victorian Lambeth techniques with intricate scalloped borders, soft pastel palette, and cocktail cherries. Perfect for trendy 20s/30s birthdays and chic celebrations.",
      basePrice: 899,
      isEggless: true,
      isBestseller: true,
      isFeatured: true,
      isSpecial: true,
      rating: 4.98,
      reviewCount: 88,
      ingredients: "Swiss Meringue Buttercream, Vanilla Bean Sponge, Raspberry Compote, Organic Sugar",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "4-6 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "custom-cakes",
      seoTitle: "Vintage Lambeth Cake | Aesthetic Custom Cake Bangalore",
      seoDescription: "Order trendy Victorian Lambeth piped celebration cake in Bangalore. Aesthetic pastel birthday cake.",
      seoKeywords: "vintage lambeth cake, aesthetic birthday cake, korean bento cake, piped cake bangalore",
      images: [
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562777717-dc6984f65a63?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 899, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1699, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 2399, servings: "14-18 Servings" },
        { name: "2.0 kg", weightKg: 2.0, price: 3099, servings: "20-24 Servings" },
      ],
    },
    {
      slug: "black-forest-kirsch-gateau-cake",
      name: "German Black Forest Cherry Gateau",
      shortDesc: "Layered chocolate sponge with sour black cherries, whipped cream and dark flakes.",
      description:
        "The timeless classic perfected with authentic German recipe standards. Moist cocoa sponge layered with black cherry compote, light whipped cream, and generously covered in shaved dark chocolate blossoms.",
      basePrice: 599,
      isEggless: true,
      isBestseller: false,
      isFeatured: false,
      isSpecial: false,
      rating: 4.85,
      reviewCount: 62,
      ingredients: "Dark Chocolate, Imported Black Cherries, Whipped Cream, Cocoa Sponge",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "2 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "chocolate-cakes",
      seoTitle: "German Black Forest Cake | Order Eggless Black Forest Bangalore",
      seoDescription: "Authentic German Black Forest Cake with juicy sour cherries and rich dark chocolate.",
      seoKeywords: "black forest cake, eggless black forest cake bangalore, traditional black forest",
      images: [
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 599, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1099, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 1599, servings: "14-18 Servings" },
        { name: "2.0 kg", weightKg: 2.0, price: 2099, servings: "20-24 Servings" },
      ],
    },
    {
      slug: "pistachio-rose-tres-leches-cake",
      name: "Pistachio Rose Tres Leches Cake",
      shortDesc: "Melt-in-mouth sponge soaked in saffron-infused three milks with roasted pistachios.",
      description:
        "A royal Middle-Eastern twist on the classic Latin American dessert. Ultra-soft cardamom sponge soaked in a rich saffron, rosewater, and pistachio three-milk reduction, topped with whipped cream and crushed Iranian pistachios.",
      basePrice: 799,
      isEggless: true,
      isBestseller: true,
      isFeatured: true,
      isSpecial: true,
      rating: 4.96,
      reviewCount: 110,
      ingredients: "Iranian Pistachios, Kashmiri Saffron, Rose Water, Evaporated Milk, Condensed Milk, Whole Milk, Sponge",
      allergens: "Contains Dairy, Nuts (Pistachios) & Gluten. 100% Eggless.",
      preparationTime: "3 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "birthday-cakes",
      seoTitle: "Pistachio Rose Tres Leches Cake | Gourmet Cake Bangalore",
      seoDescription: "Order rich Pistachio Rose Tres Leches cake online. Saffron soaked sponge with roasted pistachios.",
      seoKeywords: "tres leches cake, pistachio cake, eggless tres leches bangalore, gourmet cakes",
      images: [
        "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 799, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1499, servings: "8-12 Servings" },
        { name: "1.5 kg", weightKg: 1.5, price: 2199, servings: "14-18 Servings" },
      ],
    },
    {
      slug: "floral-tiered-wedding-anniversary-cake",
      name: "Botanical Floral 2-Tier Celebration Cake",
      shortDesc: "Majestic two-tier white chocolate and berry cake adorned with edible botanical blooms.",
      description:
        "Designed for unforgettable weddings, milestone anniversaries, and grand engagements. Features a bottom tier of White Chocolate Raspberry and top tier of Vanilla Bean, dressed in smooth semi-naked buttercream, edible gold leaf, and fresh organic flowers.",
      basePrice: 2899,
      isEggless: true,
      isBestseller: false,
      isFeatured: true,
      isSpecial: true,
      rating: 4.97,
      reviewCount: 45,
      ingredients: "Organic White Chocolate, Fresh Raspberries, Buttercream, 24K Edible Gold, Fresh Florals",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "24 Hours Notice",
      stockStatus: "IN_STOCK",
      categorySlug: "wedding-anniversary",
      seoTitle: "Botanical Floral 2-Tier Wedding Cake | Velvet & Crumb",
      seoDescription: "Stunning 2-tier wedding and anniversary cakes with fresh florals and custom flavors in Bangalore.",
      seoKeywords: "wedding cake bangalore, 2 tier anniversary cake, floral wedding cake, engagement cake",
      images: [
        "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "2-Tier (2.5 kg)", weightKg: 2.5, price: 3499, servings: "25-30 Servings" },
        { name: "2-Tier (3.5 kg)", weightKg: 3.5, price: 4799, servings: "35-42 Servings" },
        { name: "3-Tier (5.0 kg)", weightKg: 5.0, price: 6899, servings: "50-60 Servings" },
      ],
    },
    {
      slug: "assorted-artisan-cupcake-box-of-6",
      name: "Assorted Gourmet Cupcakes (Box of 6)",
      shortDesc: "Selection of 6 artisan cupcakes: Red Velvet, Chocolate Ganache, Salted Caramel & Berry.",
      description:
        "A delightful tasting box containing 6 of our most popular gourmet cupcake creations. Includes 2x Red Velvet Cream Cheese, 2x Belgian Chocolate Ganache, 1x Salted Caramel, and 1x Wild Berry Buttercream.",
      basePrice: 449,
      isEggless: true,
      isBestseller: true,
      isFeatured: false,
      isSpecial: false,
      rating: 4.9,
      reviewCount: 130,
      ingredients: "Dutch Cocoa, Vanilla Cream, Cream Cheese, Sea Salt Caramel, Berries, Butter",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "1 Hour",
      stockStatus: "IN_STOCK",
      categorySlug: "cupcakes-pastries",
      seoTitle: "Assorted Cupcakes Box of 6 | Eggless Cupcakes Bangalore",
      seoDescription: "Order freshly baked box of 6 eggless artisan cupcakes with decadent frostings.",
      seoKeywords: "cupcakes box bangalore, eggless cupcakes, red velvet cupcakes, birthday cupcakes",
      images: [
        "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "Box of 6", weightKg: 0.4, price: 449, servings: "6 Pieces" },
        { name: "Box of 12", weightKg: 0.8, price: 849, servings: "12 Pieces" },
      ],
    },
    {
      slug: "fudgy-dark-chocolate-walnut-brownies-box",
      name: "Fudgy Belgian Dark Chocolate Walnut Brownies (Box of 6)",
      shortDesc: "Gooey, dense chocolate fudge brownies loaded with California walnuts.",
      description:
        "Intensely chocolaty with that coveted crackly crinkle top and gooey fudge center. Baked with melted Belgian chocolate and toasted California walnuts.",
      basePrice: 499,
      isEggless: true,
      isBestseller: true,
      isFeatured: false,
      isSpecial: false,
      rating: 4.94,
      reviewCount: 95,
      ingredients: "Dark Chocolate, California Walnuts, Cocoa Powder, Pure Butter, Cane Sugar",
      allergens: "Contains Nuts (Walnuts), Dairy & Gluten. 100% Eggless.",
      preparationTime: "1 Hour",
      stockStatus: "IN_STOCK",
      categorySlug: "brownies-cookies",
      seoTitle: "Fudgy Chocolate Walnut Brownies | Best Brownies Bangalore",
      seoDescription: "Order gooey Belgian dark chocolate eggless brownies with crunchy walnuts online.",
      seoKeywords: "chocolate brownies, walnut brownies, eggless brownies bangalore, fudge brownies",
      images: [
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "Box of 6 Brownies", weightKg: 0.45, price: 499, servings: "6 Pieces" },
        { name: "Box of 12 Brownies", weightKg: 0.9, price: 949, servings: "12 Pieces" },
      ],
    },
    {
      slug: "artisanal-celebration-gift-hamper-luxury",
      name: "The Grand Patisserie Luxury Gift Hamper",
      shortDesc: "Opulent gift box with gourmet cookies, chocolate brownies, macarons, and artisanal jams.",
      description:
        "The ultimate gourmet celebration hamper. Beautifully presented in a handcrafted satin-ribbon box containing 4x Belgian Brownies, 6x French Macarons, 1x Jar Chocolate Hazelnut Spread, 1x Box Choco-Chunk Cookies, and a celebratory greeting card.",
      basePrice: 1499,
      isEggless: true,
      isBestseller: false,
      isFeatured: true,
      isSpecial: true,
      rating: 4.95,
      reviewCount: 38,
      ingredients: "Belgian Chocolate, Hazelnut Spread, French Macarons, Sea Salt Cookies, Brownies",
      allergens: "Contains Nuts & Dairy. 100% Eggless.",
      preparationTime: "4 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "gift-hampers",
      seoTitle: "Luxury Patisserie Gift Hamper | Bakery Hampers Bangalore",
      seoDescription: "Send premium bakery gift hampers in Bangalore. Curated sweets, macarons, cookies, and brownies.",
      seoKeywords: "bakery gift hamper, festival hamper, birthday gift box, luxury corporate hamper",
      images: [
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "Classic Box", weightKg: 1.0, price: 1499, servings: "Serves 4-6" },
        { name: "Royale Grand Hamper", weightKg: 1.8, price: 2499, servings: "Serves 8-10" },
      ],
    },
    {
      slug: "mango-passion-fruit-cheesecake",
      name: "Alphonso Mango & Passion Fruit Cheesecake",
      shortDesc: "Silky baked New York style cheesecake topped with fresh Alphonso mango pulp and passionfruit.",
      description:
        "Creamy Philadelphia cream cheese on a crunchy buttery graham crust, crowned with fresh Ratnagiri Alphonso mango jelly and tropical passion fruit seeds.",
      basePrice: 849,
      isEggless: true,
      isBestseller: true,
      isFeatured: false,
      isSpecial: true,
      rating: 4.91,
      reviewCount: 52,
      ingredients: "Philadelphia Cream Cheese, Alphonso Mango Pulp, Passion Fruit, Graham Cracker Crust, Dairy Cream",
      allergens: "Contains Dairy & Gluten. 100% Eggless.",
      preparationTime: "4 Hours",
      stockStatus: "IN_STOCK",
      categorySlug: "fruit-cakes",
      seoTitle: "Mango Cheesecake Online | Best Cheesecakes Bangalore",
      seoDescription: "Order eggless Alphonso Mango Cheesecake online in Bangalore. Creamy New York style cheesecake.",
      seoKeywords: "mango cheesecake, eggless cheesecake bangalore, passion fruit dessert",
      images: [
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
      ],
      variants: [
        { name: "0.5 kg", weightKg: 0.5, price: 849, servings: "4-6 Servings" },
        { name: "1.0 kg", weightKg: 1.0, price: 1599, servings: "8-12 Servings" },
      ],
    },
  ];

  for (const item of products) {
    const categoryId = categoryMap.get(item.categorySlug);
    if (!categoryId) continue;

    const product = await prisma.product.create({
      data: {
        slug: item.slug,
        name: item.name,
        shortDesc: item.shortDesc,
        description: item.description,
        basePrice: item.basePrice,
        isEggless: item.isEggless,
        isBestseller: item.isBestseller,
        isFeatured: item.isFeatured,
        isSpecial: item.isSpecial,
        rating: item.rating,
        reviewCount: item.reviewCount,
        ingredients: item.ingredients,
        allergens: item.allergens,
        preparationTime: item.preparationTime,
        stockStatus: item.stockStatus,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        seoKeywords: item.seoKeywords,
        categoryId: categoryId,
        images: {
          create: item.images.map((url, idx) => ({
            url,
            isPrimary: idx === 0,
            order: idx,
            alt: item.name,
          })),
        },
        variants: {
          create: item.variants.map((v) => ({
            name: v.name,
            weightKg: v.weightKg,
            price: v.price,
            servings: v.servings,
            inStock: true,
          })),
        },
      },
    });

    // Add sample verified reviews for featured products
    await prisma.review.createMany({
      data: [
        {
          productId: product.id,
          customerName: "Ananya Deshmukh",
          rating: 5,
          title: "Out of this world! Best cake we ever had",
          comment: "Ordered this for my husband's 30th birthday and everyone was stunned. The texture was so moist and rich, hard to believe it is 100% eggless! Delivery was sharp on time.",
          isApproved: true,
          isFeatured: true,
        },
        {
          productId: product.id,
          customerName: "Rahul Verma",
          rating: 5,
          title: "Fresh, premium and extremely elegant",
          comment: "Packaging was pristine and temperature controlled. The flavor balance was perfection without being overly sweet. Highly recommended!",
          isApproved: true,
          isFeatured: false,
        },
      ],
    });
  }

  console.log("🎂 Created rich product catalog with variants and reviews");

  // 5. Celebration Addons
  const addons = [
    { name: "Golden Number Sparkler Candle (0-9)", price: 99, category: "Candles" },
    { name: "Designer Acrylic 'Happy Birthday' Cake Topper", price: 149, category: "Toppers" },
    { name: "Luxury Gold Plated Cake Knife & Server Set", price: 299, category: "Accessories" },
    { name: "Handcrafted Calligraphy Greeting Card with Custom Message", price: 79, category: "Cards" },
    { name: "Party Confetti Popper (Set of 2)", price: 129, category: "Celebration" },
  ];

  await prisma.productAddon.createMany({
    data: addons,
  });

  console.log("✨ Created celebration addons:", addons.length);

  // 6. Promotional Coupons
  const coupons = [
    {
      code: "WELCOME10",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderAmount: 499,
      maxDiscount: 200,
      isActive: true,
    },
    {
      code: "FLAT100",
      discountType: "FIXED",
      discountValue: 100,
      minOrderAmount: 799,
      isActive: true,
    },
    {
      code: "SWEETCELEBRATE",
      discountType: "PERCENTAGE",
      discountValue: 15,
      minOrderAmount: 1299,
      maxDiscount: 350,
      isActive: true,
    },
  ];

  await prisma.coupon.createMany({
    data: coupons,
  });

  console.log("🏷️ Created promotional coupons:", coupons.length);

  // 7. SEO-Rich Blog Posts
  const blogPosts = [
    {
      slug: "ultimate-guide-to-choosing-birthday-cake-flavors",
      title: "The Ultimate Guide to Choosing the Perfect Birthday Cake Flavor",
      excerpt: "From rich Belgian dark truffles to refreshing seasonal mango chiffon, discover how to pick the crowd-pleaser flavor for kids, adults, and grand celebrations.",
      content: `
# The Ultimate Guide to Choosing the Perfect Birthday Cake Flavor

Choosing the right birthday cake is the centerpiece of any memorable celebration. Whether you are hosting an intimate gathering or a 100-guest birthday party, here is our master pastry chef's guide to picking the ultimate flavor profile.

## 1. Consider the Audience & Age Group
* **For Kids & Young Celebrations**: Mild chocolate, Funfetti vanilla, strawberry cream, and Oreo cookie crunch are universal favorites.
* **For Adults & Milestones (30th, 40th, 50th)**: Intense 70% Belgian Dark Chocolate Truffle, Classic Red Velvet with tangy cream cheese, or Pistachio Rose Tres Leches.
* **For Summer Celebrations**: Light fruit gateaus with Alphonso mangoes, berries, and citrus curds keep guests refreshed.

## 2. Choosing Between Buttercream vs. Whipped Cream vs. Ganache
* **Whipped Dairy Cream**: Super light, airy, and best consumed on the same day.
* **Belgian Chocolate Ganache**: Rich, decadent, holds structural stability for 3D designs.
* **Swiss Meringue Buttercream**: Silky, not overly sweet, ideal for vintage Lambeth piping.

## 3. The 100% Eggless Factor
At Velvet & Crumb, our signature eggless sponge recipes use organic Greek yogurt, cultured buttermilk, and condensed dairy reductions to achieve ultra-moist crumb textures that rival traditional bakes.

## Pro Tip for Party Sizing
* **0.5 kg**: 4 to 6 Guests
* **1.0 kg**: 8 to 12 Guests
* **1.5 kg**: 14 to 18 Guests
* **2.0 kg+**: 20+ Guests or Multi-Tier Cakes
      `,
      coverImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1200&auto=format&fit=crop",
      author: "Chef Pierre",
      readTime: "4 min read",
      tags: "Birthday Cakes, Cake Flavors, Party Planning, Bakery Guide",
      seoTitle: "How to Choose Birthday Cake Flavors | Ultimate Bakery Guide",
      seoDescription: "Master chef guide to picking the best birthday cake flavor for kids, adults, and parties. Eggless tips and size calculators.",
    },
    {
      slug: "secrets-of-moist-eggless-cake-baking",
      title: "The Science & Secrets Behind Irresistibly Moist Eggless Cakes",
      excerpt: "Unlocking the chemistry of eggless baking: how gourmet bakeries achieve cloud-like fluffiness and richness without eggs.",
      content: `
# The Science & Secrets Behind Irresistibly Moist Eggless Cakes

For years, eggless cakes had an unfair reputation for being dense or dry. Today, modern patisserie science has completely revolutionized egg-free baking.

## The Chemistry of Replacing Eggs
Eggs traditionally provide structure, moisture, and leavening. In artisanal eggless patisserie, we substitute these functions with precision:

1. **Moisture & Fat**: Cultured dairy, whipped heavy cream, and emulsified plant fats.
2. **Leavening Reaction**: Balanced sodium bicarbonate with organic fruit acids creates micro-air pockets for supreme lightness.
3. **Crumb Softness**: Slow-milled organic pastry flour with low gluten protein.

## Why Velvet & Crumb Cakes Stay Fresh Longer
Because our sponges are infused with natural fruit reductions and real Madagascar vanilla syrups, they retain moisture in refrigeration for up to 4 days without losing their pillowy texture.
      `,
      coverImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
      author: "Pastry Team",
      readTime: "5 min read",
      tags: "Eggless Baking, Baking Science, Desserts, Food Guide",
      seoTitle: "Secrets of Moist Eggless Cake Baking | Velvet & Crumb",
      seoDescription: "Learn how professional bakeries make ultra-moist eggless cakes. Science of eggless baking explained.",
    },
    {
      slug: "trending-custom-cake-designs-2026",
      title: "Top 7 Trending Custom Cake Designs for Celebrations in 2026",
      excerpt: "From vintage Lambeth Victorian piping and Korean minimalist bento cakes to edible metallic geode structures, explore what is hot in cake design.",
      content: `
# Top 7 Trending Custom Cake Designs for Celebrations in 2026

Cake artistry has evolved into wearable-art-level sculpture. If you are planning a celebration this year, here are the top trending styles customers are requesting in our custom studio:

1. **Vintage Victorian Lambeth Piping**: Elaborate ruffled borders, cascading scallops, pastel buttercreams, and cherries on top.
2. **Korean Minimalist Bento Cakes**: Pastel palette, cute hand-drawn illustrations, and witty personalized one-liners.
3. **Botanical Floral & Pressed Edible Petals**: Real organic pansies, lavender sprigs, and chamomile pressed into smooth white ganache.
4. **Sculpted 3D Character Cakes**: Lifelike edible figurines for kids' milestone birthdays.
5. **Metallic Gold & Textured Concrete Finishes**: Modern industrial aesthetics for corporate galas and stylish weddings.
6. **Floating Multi-Tier Illusions**: Acrylic spacers with internal LED lighting or floral cascades.
7. **Burn-Away Surprise Cakes**: Top edible wafer layer burns cleanly to reveal a surprise hidden photo or message underneath!

Ready to bring your custom cake idea to life? Use our 7-step online Custom Cake Builder!
      `,
      coverImage: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1200&auto=format&fit=crop",
      author: "Cake Artist Elena",
      readTime: "6 min read",
      tags: "Custom Cakes, Design Trends, Wedding Cakes, 2026 Trends",
      seoTitle: "Trending Custom Cake Designs 2026 | Custom Cake Studio",
      seoDescription: "Explore the most popular custom cake trends for 2026: Vintage Lambeth, Korean Bento, and 3D Sculpted Cakes.",
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    });
  }

  console.log("📝 Created SEO blog posts:", blogPosts.length);

  // 8. Sample Initial Order & Custom Cake Inquiry for Demo
  const sampleOrder = await prisma.order.create({
    data: {
      orderNumber: "BAK-2026-00101",
      userId: customer.id,
      customerName: "Priya Sharma",
      customerEmail: "priya.sharma@example.com",
      customerPhone: "+919812345678",
      deliveryType: "DELIVERY",
      address: "Flat 402, Sunshine Apartments, 12th Main, Koramangala 4th Block",
      landmark: "Opposite Wipro Park",
      city: "Bangalore",
      postalCode: "560034",
      deliveryDate: "2026-08-18",
      deliverySlot: "Evening Express (06:00 PM - 09:00 PM)",
      cakeMessage: "Happy 30th Birthday Siddharth!",
      orderNotes: "Please handle carefully, deliver before 7 PM.",
      subtotal: 1299,
      discount: 100,
      deliveryCharge: 0,
      tax: 60,
      total: 1259,
      status: "PREPARING",
      paymentStatus: "PAID",
      paymentMethod: "RAZORPAY",
      razorpayOrderId: "order_mock_123456",
      razorpayPaymentId: "pay_mock_789012",
      items: {
        create: [
          {
            productId: (await prisma.product.findFirst({ where: { slug: "belgian-dark-chocolate-truffle-cake" } }))!.id,
            variantName: "1.0 kg",
            weightKg: 1.0,
            unitPrice: 1299,
            quantity: 1,
            cakeMessage: "Happy 30th Birthday Siddharth!",
            eggless: true,
            totalPrice: 1299,
          },
        ],
      },
    },
  });

  const sampleCustomCake = await prisma.customCakeRequest.create({
    data: {
      inquiryNumber: "CC-2026-00101",
      userId: customer.id,
      customerName: "Rohan Nair",
      customerPhone: "+919988776655",
      customerEmail: "rohan.nair@example.com",
      customerWhatsapp: "919988776655",
      occasion: "Engagement Celebration",
      flavor: "Belgian Dark Chocolate & Raspberry",
      tierSizeKg: "2-Tier (3.0 kg)",
      servingsEstimate: "30-35 Servings",
      referenceImageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop",
      designNotes: "Pastel peach and gold foil finish with white florals cascading between the two tiers.",
      cakeMessage: "Forever Begins Today - R & S",
      themeColor: "Peach & Warm Gold",
      toppings: "Fresh edible florals and gold leaf accents",
      nameOnCake: "Rohan & Sneha",
      isEggless: true,
      deliveryDate: "2026-08-25",
      deliverySlot: "Afternoon Slot (02:00 PM - 05:00 PM)",
      deliveryType: "DELIVERY",
      address: "Villa 14, Palm Meadows, Whitefield, Bangalore",
      estimatedPriceMin: 3600,
      estimatedPriceMax: 4200,
      quotationPrice: 3850,
      adminNotes: "Client requested organic edible flowers. Chef confirmed slot availability.",
      status: "QUOTATION_SENT",
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        title: "New Cake Order Placed",
        message: `Order #${sampleOrder.orderNumber} received for ₹1,259 from Priya Sharma`,
        type: "ORDER",
        link: `/admin/orders`,
      },
      {
        title: "New Custom Cake Inquiry",
        message: `Inquiry #${sampleCustomCake.inquiryNumber} for 2-Tier Engagement Cake received`,
        type: "CUSTOM_CAKE",
        link: `/admin/custom-cakes`,
      },
    ],
  });

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
