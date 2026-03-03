import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useShopifyCheckout, ParsedCart, ShopifyCartLine, LineItemAttribute } from '../hooks/useShopifyCheckout';

/* ── Local item (always available, even in demo) ────────────── */

export interface CartItem {
  id: string; // local UUID
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  metal?: string;
  carat?: string;
  size?: string;    // Ring Size (line item property)
  shape?: string;   // Diamond Shape (line item property)
  image?: string;
  productHandle?: string; // used for deep-linking back to product page
}

interface CartContextValue {
  /* Local items (instant UI) */
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  /* Shopify sync */
  shopifyCart: ParsedCart | null;
  shopifyLines: ShopifyCartLine[];
  isShopifyLive: boolean;
  loading: boolean;
  /* Drawer */
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  /* Actions */
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  redirectToCheckout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

let nextId = 1;

/* ── Provider ───────────────────────────────────────────────── */

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shopify = useShopifyCheckout();

  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('orea_cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('orea_cart', JSON.stringify(items));
  }, [items]);

  // Rehydrate Shopify cart on mount
  useEffect(() => {
    if (shopify.isLive) {
      shopify.fetchCart();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  /* Add ────────────────────────────────────────────────────── */
  const addToCart = useCallback((item: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (p) =>
          p.productId === item.productId &&
          p.metal === item.metal &&
          p.carat === item.carat &&
          p.size === item.size &&
          p.shape === item.shape,
      );
      if (existing) {
        return prev.map((p) => p.id === existing.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...item, id: `local-${nextId++}`, quantity }];
    });

    // Sync to Shopify — build line item attributes from non-variant options
    if (shopify.isLive && item.variantId) {
      const attributes: LineItemAttribute[] = [];
      if (item.size) attributes.push({ key: 'Ring Size', value: item.size });
      if (item.shape) attributes.push({ key: 'Diamond Shape', value: item.shape });
      shopify.addToCart(item.variantId, quantity, attributes.length ? attributes : undefined);
    }

    setIsDrawerOpen(true);
  }, [shopify]);

  /* Update ─────────────────────────────────────────────────── */
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    }
  }, []);

  /* Remove ─────────────────────────────────────────────────── */
  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  /* Clear ──────────────────────────────────────────────────── */
  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('orea_cart');
  }, []);

  /* Checkout redirect ──────────────────────────────────────── */
  const redirectToCheckout = useCallback(() => {
    const url = shopify.getCheckoutUrl();
    if (url) {
      window.location.href = url;
    }
    // If no Shopify URL, the checkout page shows a placeholder
  }, [shopify]);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      subtotal,
      shopifyCart: shopify.cart,
      shopifyLines: shopify.cart?.lines ?? [],
      isShopifyLive: shopify.isLive,
      loading: shopify.loading,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      redirectToCheckout,
    }}>
      {children}
    </CartContext.Provider>
  );
};

/* ── Hook ───────────────────────────────────────────────────── */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
