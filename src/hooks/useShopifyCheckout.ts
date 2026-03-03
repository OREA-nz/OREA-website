import { useState, useCallback } from 'react';
import {
  SHOPIFY_CONFIG,
  shopifyFetch,
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
  GET_CART,
} from '../lib/shopify';

/* ── Types ──────────────────────────────────────────────────── */

export interface LineItemAttribute {
  key: string;
  value: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  attributes: LineItemAttribute[];
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    image?: { url: string; altText?: string };
    product: { title: string; handle: string };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: { node: ShopifyCartLine }[] };
}

/* ── Helpers ────────────────────────────────────────────────── */

function parseCart(cart: ShopifyCart) {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: parseFloat(cart.cost.subtotalAmount.amount),
    total: parseFloat(cart.cost.totalAmount.amount),
    currency: cart.cost.totalAmount.currencyCode,
    lines: cart.lines.edges.map((e) => e.node),
  };
}

export type ParsedCart = ReturnType<typeof parseCart>;

/**
 * Builds a Shopify-format variant GID from a numeric ID.
 * Shopify Storefront API requires IDs in GID format.
 */
function toVariantGid(variantId: string): string {
  if (variantId.startsWith('gid://')) return variantId;
  return `gid://shopify/ProductVariant/${variantId}`;
}

/* ── Hook ───────────────────────────────────────────────────── */

export function useShopifyCheckout() {
  const [cart, setCart] = useState<ParsedCart | null>(null);
  const [loading, setLoading] = useState(false);
  const isLive = SHOPIFY_CONFIG.isConfigured;

  const createCart = useCallback(async (
    variantId?: string,
    quantity = 1,
    attributes?: LineItemAttribute[],
  ) => {
    if (!isLive) return null;
    setLoading(true);
    try {
      const lineInput = variantId
        ? { merchandiseId: toVariantGid(variantId), quantity, ...(attributes?.length ? { attributes } : {}) }
        : null;
      const input = lineInput ? { lines: [lineInput] } : {};
      const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(CART_CREATE, { input });
      const parsed = parseCart(data.cartCreate.cart);
      setCart(parsed);
      localStorage.setItem('orea_cart_id', parsed.id);
      return parsed;
    } finally {
      setLoading(false);
    }
  }, [isLive]);

  const addToCart = useCallback(async (
    variantId: string,
    quantity = 1,
    attributes?: LineItemAttribute[],
  ) => {
    if (!isLive) return null;
    setLoading(true);
    try {
      let cartId = cart?.id || localStorage.getItem('orea_cart_id');
      if (!cartId) {
        const newCart = await createCart(variantId, quantity, attributes);
        return newCart;
      }
      const lineInput: Record<string, unknown> = {
        merchandiseId: toVariantGid(variantId),
        quantity,
      };
      if (attributes?.length) lineInput.attributes = attributes;

      const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(CART_LINES_ADD, {
        cartId,
        lines: [lineInput],
      });
      const parsed = parseCart(data.cartLinesAdd.cart);
      setCart(parsed);
      return parsed;
    } finally {
      setLoading(false);
    }
  }, [isLive, cart, createCart]);

  const updateLineQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!isLive || !cart) return null;
    setLoading(true);
    try {
      const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(CART_LINES_UPDATE, {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }],
      });
      const parsed = parseCart(data.cartLinesUpdate.cart);
      setCart(parsed);
      return parsed;
    } finally {
      setLoading(false);
    }
  }, [isLive, cart]);

  const removeLine = useCallback(async (lineId: string) => {
    if (!isLive || !cart) return null;
    setLoading(true);
    try {
      const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(CART_LINES_REMOVE, {
        cartId: cart.id,
        lineIds: [lineId],
      });
      const parsed = parseCart(data.cartLinesRemove.cart);
      setCart(parsed);
      return parsed;
    } finally {
      setLoading(false);
    }
  }, [isLive, cart]);

  const fetchCart = useCallback(async () => {
    if (!isLive) return null;
    const cartId = cart?.id || localStorage.getItem('orea_cart_id');
    if (!cartId) return null;
    setLoading(true);
    try {
      const data = await shopifyFetch<{ cart: ShopifyCart }>(GET_CART, { cartId });
      if (data.cart) {
        const parsed = parseCart(data.cart);
        setCart(parsed);
        return parsed;
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [isLive, cart]);

  const getCheckoutUrl = useCallback(() => {
    return cart?.checkoutUrl ?? null;
  }, [cart]);

  return {
    cart,
    loading,
    isLive,
    createCart,
    addToCart,
    updateLineQuantity,
    removeLine,
    fetchCart,
    getCheckoutUrl,
  };
}
