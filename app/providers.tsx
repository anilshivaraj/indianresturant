"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
}

export interface CartContextValue {
  orderId: string | null;
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "sir_cart_v1";

interface StoredCart {
  orderId: string | null;
  items: CartItem[];
}

function loadStoredCart(): StoredCart {
  if (typeof window === "undefined") return { orderId: null, items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { orderId: null, items: [] };
    const parsed = JSON.parse(raw) as StoredCart;
    return { orderId: parsed.orderId ?? null, items: parsed.items ?? [] };
  } catch {
    return { orderId: null, items: [] };
  }
}

function saveStoredCart(cart: StoredCart) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {}
}

function generateFiveDigitId(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  return String(n);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const { orderId, items } = loadStoredCart();
    setOrderId(orderId);
    setItems(items);
  }, []);

  useEffect(() => {
    saveStoredCart({ orderId, items });
  }, [orderId, items]);

  const add: CartContextValue["add"] = useCallback((item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...item, qty }];
    });
    setOrderId((id) => id ?? generateFiveDigitId());
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setOrderId(null);
  }, []);

  const total = useCallback(() => {
    return items.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({ orderId, items, add, updateQty, remove, clear, total }),
    [orderId, items, add, updateQty, remove, clear, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


