"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/config/site";
import { Coupon } from "@/types/database";

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  slug: string;
  name: string;
  image: string;
  variantId?: string;
  variantName: string;
  weightKg?: number;
  unitPrice: number;
  quantity: number;
  cakeMessage?: string;
  eggless: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateMessage: (id: string, message: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryCharge: number;
  taxAmount: number;
  totalAmount: number;
  itemCount: number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "velvet_crumb_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isLoaded]);

  const addItem = useCallback((itemData: Omit<CartItem, "id">) => {
    setItems((prev) => {
      // Check if matching item (same productId, variantId, eggless, cakeMessage) exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === itemData.productId &&
          i.variantId === itemData.variantId &&
          i.eggless === itemData.eggless &&
          (i.cakeMessage || "") === (itemData.cakeMessage || "")
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += itemData.quantity;
        return updated;
      }

      const newItem: CartItem = {
        ...itemData,
        id: `${itemData.productId}-${itemData.variantId || "default"}-${Date.now()}`,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const updateMessage = useCallback((id: string, message: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cakeMessage: message } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === "PERCENTAGE") {
      const calculated = (subtotal * appliedCoupon.discountValue) / 100;
      discountAmount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const deliveryCharge =
    subtotal === 0 || subtotal >= siteConfig.delivery.freeDeliveryThreshold
      ? 0
      : siteConfig.delivery.standardDeliveryFee;

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.05); // 5% GST on bakery goods
  const totalAmount = Math.max(0, taxableAmount + deliveryCharge + taxAmount);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (
    code: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}&amount=${subtotal}`);
      const data = await res.json();
      if (data.valid && data.coupon) {
        setAppliedCoupon(data.coupon);
        return { success: true, message: `Coupon "${code.toUpperCase()}" applied! Saved ${siteConfig.currency.symbol}${data.discount}` };
      }
      return { success: false, message: data.message || "Invalid coupon code" };
    } catch {
      return { success: false, message: "Error validating coupon" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateMessage,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        deliveryCharge,
        taxAmount,
        totalAmount,
        itemCount,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
