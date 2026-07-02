"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";

export interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  resetCartState: () => void;
  loadUserCart: (token: string) => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);
export const CART_KEY = "guest_cart";
const API = process.env.NEXT_PUBLIC_API_URL;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const tokenRef = useRef<string | null>(null);
  const skipSyncRef = useRef(false); // prevent sync right after loading from DB

  // On mount: load guest cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Sync to DB whenever items change and user is logged in
  const syncTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!tokenRef.current) return;
    if (skipSyncRef.current) { skipSyncRef.current = false; return; }
    if (syncTimeout.current) clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => {
      fetch(`${API}/api/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenRef.current}` },
        body: JSON.stringify({ items }),
      }).catch(() => {});
    }, 600);
  }, [items]);

  // Called after login: merge guest cart → DB, then load DB cart into state
  const loadUserCart = useCallback(async (token: string) => {
    tokenRef.current = token;
    try {
      const guestRaw = localStorage.getItem(CART_KEY);
      const guestItems: CartItem[] = guestRaw ? JSON.parse(guestRaw) : [];

      if (guestItems.length > 0) {
        await fetch(`${API}/api/cart/merge`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ items: guestItems }),
        });
        localStorage.removeItem(CART_KEY);
      }

      // Fetch the final merged cart from DB
      const res = await fetch(`${API}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const dbItems: CartItem[] = await res.json();
        skipSyncRef.current = true; // don't sync back what we just loaded
        setItems(dbItems);
      }
    } catch {}
  }, []);

  const persist = useCallback((updated: CartItem[]) => {
    setItems(updated);
    // If guest, keep in localStorage
    if (!tokenRef.current) {
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
    }
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      const updated = existing
        ? prev.map((i) => i.productId === item.productId ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { ...item, qty }];
      if (!tokenRef.current) localStorage.setItem(CART_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.productId !== productId);
      if (!tokenRef.current) {
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
      } else {
        fetch(`${API}/api/cart`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenRef.current}` },
          body: JSON.stringify({ items: updated }),
        }).catch(() => {});
      }
      return updated;
    });
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => {
      const updated = prev.map((i) => i.productId === productId ? { ...i, qty } : i);
      if (!tokenRef.current) {
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
      } else {
        fetch(`${API}/api/cart`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenRef.current}` },
          body: JSON.stringify({ items: updated }),
        }).catch(() => {});
      }
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    skipSyncRef.current = true;
    setItems([]);
    localStorage.removeItem(CART_KEY);
    if (tokenRef.current) {
      fetch(`${API}/api/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenRef.current}` },
        body: JSON.stringify({ items: [] }),
      }).catch(() => {});
    }
    tokenRef.current = null;
  }, []);

  // Used on logout: clears state only, keeps DB intact
  const resetCartState = useCallback(() => {
    skipSyncRef.current = true;
    setItems([]);
    localStorage.removeItem(CART_KEY);
    tokenRef.current = null;
  }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, resetCartState, loadUserCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
