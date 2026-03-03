import { useState, useEffect } from 'react';
import {
  shopifyFetch,
  SHOPIFY_CONFIG,
  GET_STOREFRONT_PRODUCTS,
  GET_SEARCH_RESULTS,
} from '../lib/shopify';
import { COLLECTION_PRODUCTS } from '../data/products';
import { Product as CollectionProduct, Category, DiamondShape } from '../pages/collection/types';

/* ── Constants ───────────────────────────────────────────────── */

const SHAPE_TAGS: DiamondShape[] = [
  'Round', 'Oval', 'Pear', 'Marquise', 'Princess',
  'Emerald', 'Radiant', 'Asscher', 'Cushion', 'Heart',
];

/* ── Mapping helpers ─────────────────────────────────────────── */

function mapProductType(productType: string, title: string = ''): Category {
  // Primary: use Shopify productType field
  // 'earring' must be checked before 'ring' — "earring" contains "ring" as a substring
  const t = productType.toLowerCase();
  if (t.includes('earring'))  return 'Earrings';
  if (t.includes('ring'))     return 'Rings';
  if (t.includes('necklace')) return 'Necklaces';
  if (t.includes('bracelet')) return 'Bracelets';
  if (t.includes('pendant'))  return 'Pendants';

  // Fallback: infer from product title when productType is empty or unrecognised
  // Same ordering rule applies: earring/stud before ring
  const h = title.toLowerCase();
  if (h.includes('earring') || h.includes('stud')) return 'Earrings';
  if (h.includes('ring') || h.includes('band'))    return 'Rings';
  if (h.includes('necklace'))                      return 'Necklaces';
  if (h.includes('bracelet'))                      return 'Bracelets';
  if (h.includes('pendant'))                       return 'Pendants';

  return 'All';
}

interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  productType: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: { url: string; altText?: string } }[] };
}

function mapNode(node: ShopifyProductNode): CollectionProduct {
  const tags = node.tags.map(t => t.toLowerCase());
  const shape = SHAPE_TAGS.find(s => tags.includes(s.toLowerCase()));
  const images = node.images.edges.map(e => e.node.url);

  // Reuse the matching static product's id so /product/:id links stay consistent
  // with what ProductPage expects (e.g. 'ring-9', not 'oval-solitaire-ring')
  const staticMatch = COLLECTION_PRODUCTS.find(p => p.shopifyHandle === node.handle);

  return {
    id: staticMatch?.id ?? node.handle,
    name: node.title,
    price: Math.round(parseFloat(node.priceRange.minVariantPrice.amount)),
    category: mapProductType(node.productType, node.title),
    shape: staticMatch?.shape ?? shape,
    shopifyHandle: node.handle,
    imageUrl: images[0] ?? '',
    hoverImageUrl: images[1] ?? (images[0] ?? ''),
    isNew: node.tags.includes('new'),
    isBestSeller: node.tags.includes('best-seller') || node.tags.includes('bestseller'),
  };
}

/* ── Module-level cache ──────────────────────────────────────── */

let cachedCollection: CollectionProduct[] | null = null;
let fetchPromise: Promise<CollectionProduct[]> | null = null;

async function fetchCollection(): Promise<CollectionProduct[]> {
  const all: CollectionProduct[] = [];
  let cursor: string | null = null;

  do {
    const data = await shopifyFetch<{
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string };
        edges: { node: ShopifyProductNode }[];
      };
    }>(GET_STOREFRONT_PRODUCTS, cursor ? { cursor } : {});

    all.push(...data.products.edges.map(e => mapNode(e.node)));
    cursor = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null;
  } while (cursor);

  return all;
}

/* ── Public async search (used directly in CollectionPage) ───── */

export async function searchProducts(query: string): Promise<CollectionProduct[]> {
  if (!SHOPIFY_CONFIG.isConfigured) {
    return COLLECTION_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: ShopifyProductNode }[] };
    }>(GET_SEARCH_RESULTS, { query, first: 50 });
    return data.products.edges.map(e => mapNode(e.node));
  } catch {
    return [];
  }
}

/* ── Hook ───────────────────────────────────────────────────── */

export function useShopifyCollection() {
  const [products, setProducts] = useState<CollectionProduct[]>(
    cachedCollection ?? COLLECTION_PRODUCTS,
  );
  const [loading, setLoading] = useState(!cachedCollection && SHOPIFY_CONFIG.isConfigured);

  useEffect(() => {
    if (!SHOPIFY_CONFIG.isConfigured) return;
    if (cachedCollection) {
      setProducts(cachedCollection);
      return;
    }
    if (!fetchPromise) {
      fetchPromise = fetchCollection();
    }
    fetchPromise
      .then(list => {
        cachedCollection = list;
        setProducts(list);
      })
      .catch(() => {
        // Fall back to static data silently
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
