export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
  };
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  openingHours: {
    days: string;
    hours: string;
    schemaDays: string[];
    schemaOpens: string;
    schemaCloses: string;
  };
  delivery: {
    freeDeliveryThreshold: number;
    standardDeliveryFee: number;
    midnightDeliveryFee: number;
    deliveryTimeSlots: { id: string; label: string; time: string }[];
    serviceAreas: string[];
    expressDeliveryMinutes: number;
  };
  socials: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    youtube: string;
  };
  fssai?: {
    licenseNumber: string;
    label: string;
    registeredName?: string;
    validUpto?: string;
    issuedOn?: string;
    issuingAuthority?: string;
    verified: boolean;
  };
  currency: {
    code: string;
    symbol: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Honey Bunny Bakers",
  shortName: "Honey Bunny Bakers",
  tagline: "Est. 2018 • 100% Eggless Home Bakery • Fresh Fruit & Custom Celebration Cakes",
  description:
    "Honey Bunny Bakers (honey_bunny_homebakers, Est. 2018) is a 100% eggless local home bakery at Purvanchal Silver City II, Pi II, Greater Noida. Handcrafted fresh fruit cakes, personalized designer celebration cakes, and delicious bakes with direct WhatsApp ordering.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://honeybunnybakers.com",
  ogImage: "/images/logo.png",
  contact: {
    phone: "+916261507068",
    phoneFormatted: "+91 62615 07068",
    whatsapp: "916261507068",
    whatsappFormatted: "+91 62615 07068",
    email: "orders@honeybunnybakers.com",
  },
  address: {
    street: "Flat No. 304, Purvanchal Silver City - 2, Sector Pi I & II",
    area: "Sector Pi I & II, Dadri Tehsil-1",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    postalCode: "201310",
    country: "India",
    fullAddress: "Flat No. 304, Purvanchal Silver City - 2, Sector Pi I & II, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh - 201310",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14032.54848039572!2d77.5300!3d28.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb1a774a3f11%3A0x7d6a591e0a29b466!2sPurvanchal%20Silver%20City%202%2C%20Sector%20Pi-2%2C%20Greater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsLink: "https://maps.google.com/?q=Purvanchal+Silver+City+2+Sector+Pi-2+Greater+Noida",
    coordinates: {
      latitude: 28.4502,
      longitude: 77.5301,
    },
  },
  openingHours: {
    days: "Monday - Sunday (Open 7 Days)",
    hours: "09:00 AM - 10:30 PM",
    schemaDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    schemaOpens: "09:00",
    schemaCloses: "22:30",
  },
  delivery: {
    freeDeliveryThreshold: 799,
    standardDeliveryFee: 49,
    midnightDeliveryFee: 149,
    expressDeliveryMinutes: 60,
    deliveryTimeSlots: [
      { id: "slot-morning", label: "Morning Slot", time: "10:00 AM - 01:00 PM" },
      { id: "slot-afternoon", label: "Afternoon Slot", time: "02:00 PM - 05:00 PM" },
      { id: "slot-evening", label: "Evening Express", time: "06:00 PM - 09:00 PM" },
      { id: "slot-midnight", label: "Midnight Surprise (11:00 PM - 12:15 AM)", time: "11:00 PM - 12:15 AM" },
    ],
    serviceAreas: [
      "Purvanchal Silver City II",
      "Sector Pi I & II",
      "Pari Chowk",
      "Alpha 1 & 2",
      "Beta 1 & 2",
      "Gamma 1 & 2",
      "Delta 1 & 2",
      "Omega & Chi",
      "Zeta & Eta",
      "Knowledge Park I, II & III",
      "Surajpur",
      "Greater Noida West (Noida Extension)",
      "Noida Expressway (Sectors 137, 143, 150)",
    ],
  },
  socials: {
    instagram: "https://instagram.com/honey_bunny_homebakers",
    facebook: "https://facebook.com/honeybunnybakers",
    whatsapp: "https://wa.me/916261507068",
    youtube: "https://youtube.com/@honey_bunny_homebakers",
  },
  fssai: {
    licenseNumber: "22726446001503",
    label: "FSSAI Reg. No. 22726446001503",
    registeredName: "Laxmin Rawat",
    validUpto: "15-05-2031",
    issuedOn: "16-05-2026",
    issuingAuthority: "Gautam Buddha Nagar",
    verified: true,
  },
  currency: {
    code: "INR",
    symbol: "₹",
  },
};

export function getWhatsAppUrl(customText?: string): string {
  const defaultText = encodeURIComponent(
    `Hello Honey Bunny Bakers! I would like to inquire about ordering a fresh 100% eggless cake.`
  );
  const text = customText ? encodeURIComponent(customText) : defaultText;
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
}

export function formatPrice(amount: number): string {
  return `${siteConfig.currency.symbol}${amount.toLocaleString("en-IN")}`;
}
