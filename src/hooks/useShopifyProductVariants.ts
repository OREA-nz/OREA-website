import { useState, useEffect } from 'react';
import { shopifyFetch, SHOPIFY_CONFIG, GET_PRODUCT_BY_HANDLE } from '../lib/shopify';

/* ── Types ───────────────────────────────────────────────────── */

export interface LiveVariant {
  id: number;       // numeric Shopify variant ID
  title: string;
  price: number;    // in store currency
  option1: string;  // Metal
  option2: string;  // Carat (may be empty)
}

/* ── Per-handle cache ────────────────────────────────────────── */

const variantCache = new Map<string, { variants: LiveVariant[]; images: string[] }>();

interface ShopifyVariantNode {
  id: string; // GID
  title: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
}

function gidToNumber(gid: string): number {
  return parseInt(gid.split('/').pop() ?? '0', 10);
}

async function fetchProductVariants(handle: string): Promise<{ variants: LiveVariant[]; images: string[] }> {
  const data = await shopifyFetch<{
    productByHandle: {
      images: { edges: { node: { url: string } }[] };
      variants: { edges: { node: ShopifyVariantNode }[] };
    } | null;
  }>(GET_PRODUCT_BY_HANDLE, { handle });

  const product = data.productByHandle;
  if (!product) return { variants: [], images: [] };

  const images = product.images.edges.map(e => e.node.url);
  const variants: LiveVariant[] = product.variants.edges.map(e => {
    const node = e.node;
    const opts = node.selectedOptions;
    const opt = (name: string) => opts.find(o => o.name.toLowerCase() === name)?.value ?? '';
    return {
      id: gidToNumber(node.id),
      title: node.title,
      price: Math.round(parseFloat(node.price.amount)),
      option1: opt('metal') || opts[0]?.value ?? '',
      option2: opt('carat') || opts[1]?.value ?? '',
    };
  });

  return { variants, images };
}

/* ── Hook ───────────────────────────────────────────────────── */

export function useShopifyProductVariants(handle: string) {
  const cached = handle ? variantCache.get(handle) : undefined;
  const [liveVariants, setLiveVariants] = useState<LiveVariant[]>(cached?.variants ?? []);
  const [liveImages, setLiveImages] = useState<string[]>(cached?.images ?? []);
  const [loading, setLoading] = useState(!cached && SHOPIFY_CONFIG.isConfigured && !!handle);

  useEffect(() => {
    if (!handle || !SHOPIFY_CONFIG.isConfigured) {
      setLoading(false);
      return;
    }
    const existing = variantCache.get(handle);
    if (existing) {
      setLiveVariants(existing.variants);
      setLiveImages(existing.images);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProductVariants(handle)
      .then(result => {
        variantCache.set(handle, result);
        setLiveVariants(result.variants);
        setLiveImages(result.images);
      })
      .catch(() => { /* fall back to static data */ })
      .finally(() => setLoading(false));
  }, [handle]);

  return { liveVariants, liveImages, loading };
}
