import { useState, useEffect } from 'react';
import { shopifyFetch, SHOPIFY_CONFIG, GET_PRODUCT_IMAGES, GET_ALL_PRODUCT_IMAGES } from '../lib/shopify';

/* ── Module-level cache (shared across all components) ───────── */

let allImagesCache: Map<string, { primary: string; hover?: string }> | null = null;
let allImagesFetchPromise: Promise<Map<string, { primary: string; hover?: string }>> | null = null;

/* ── Single product ──────────────────────────────────────────── */

export function useShopifyProductImages(handle: string) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SHOPIFY_CONFIG.isConfigured || !handle) {
      setLoading(false);
      return;
    }

    shopifyFetch<{
      productByHandle: { images: { edges: { node: { url: string; altText: string } }[] } };
    }>(GET_PRODUCT_IMAGES, { handle })
      .then((data) => {
        const urls = data.productByHandle?.images?.edges.map((e) => e.node.url) ?? [];
        setImages(urls);
      })
      .catch(() => { /* fall back to static images */ })
      .finally(() => setLoading(false));
  }, [handle]);

  return { images, loading };
}

/* ── All products (one fetch, shared cache) ──────────────────── */

async function fetchAllImages(): Promise<Map<string, { primary: string; hover?: string }>> {
  const data = await shopifyFetch<{
    products: {
      edges: {
        node: {
          handle: string;
          images: { edges: { node: { url: string } }[] };
        };
      }[];
    };
  }>(GET_ALL_PRODUCT_IMAGES);

  const map = new Map<string, { primary: string; hover?: string }>();
  for (const { node } of data.products.edges) {
    const urls = node.images.edges.map((e) => e.node.url);
    if (urls.length > 0) {
      map.set(node.handle, { primary: urls[0], hover: urls[1] });
    }
  }
  return map;
}

export function useShopifyAllImages() {
  const [imageMap, setImageMap] = useState<Map<string, { primary: string; hover?: string }>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SHOPIFY_CONFIG.isConfigured) {
      setLoading(false);
      return;
    }

    if (allImagesCache) {
      setImageMap(allImagesCache);
      setLoading(false);
      return;
    }

    if (!allImagesFetchPromise) {
      allImagesFetchPromise = fetchAllImages();
    }

    allImagesFetchPromise
      .then((map) => {
        allImagesCache = map;
        setImageMap(map);
      })
      .catch(() => { /* fall back to static images */ })
      .finally(() => setLoading(false));
  }, []);

  return { imageMap, loading };
}
