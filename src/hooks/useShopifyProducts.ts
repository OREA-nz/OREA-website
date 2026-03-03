/**
 * useShopifyProducts
 *
 * Loads /public/products.json (generated from the Shopify product export) and
 * exposes a helper to resolve a Shopify Variant ID from a product slug,
 * metal option, and optional carat option.
 *
 * Usage:
 *   const { resolveVariant, getProduct } = useShopifyProducts();
 *   const variant = resolveVariant('emerald-solitaire-ring', '18k Yellow Gold', '1.0 CT');
 *   // variant.variantId  → Shopify numeric variant ID
 *   // variant.price      → price in NZD
 */

import { useState, useEffect, useCallback } from 'react';

export interface ShopifyVariantRecord {
  variantId: string;
  title: string;
  option1: string; // Metal
  option2: string; // Carat (empty string for metal-only products)
  price: number;
}

export interface ShopifyProductRecord {
  shopifyId: string;
  title: string;
  variants: ShopifyVariantRecord[];
}

type ProductsMap = Record<string, ShopifyProductRecord>;

let cachedProducts: ProductsMap | null = null;

export function useShopifyProducts() {
  const [products, setProducts] = useState<ProductsMap | null>(cachedProducts);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    if (cachedProducts) return;
    setLoading(true);
    fetch('/products.json')
      .then((r) => r.json())
      .then((data: { products: ProductsMap }) => {
        cachedProducts = data.products;
        setProducts(data.products);
      })
      .catch(() => {
        // Graceful degradation — products.json unavailable
      })
      .finally(() => setLoading(false));
  }, []);

  /** Get the full product record by slug (e.g. 'emerald-solitaire-ring') */
  const getProduct = useCallback(
    (slug: string): ShopifyProductRecord | null => {
      return products?.[slug] ?? null;
    },
    [products],
  );

  /**
   * Resolve the correct Shopify variant for a given product slug, metal, and optional carat.
   * Returns null if no matching variant is found.
   */
  const resolveVariant = useCallback(
    (
      slug: string,
      metal: string,
      carat?: string,
    ): ShopifyVariantRecord | null => {
      const product = products?.[slug];
      if (!product) return null;

      return (
        product.variants.find((v) => {
          const metalMatch = v.option1.trim() === metal.trim();
          if (!carat) return metalMatch;
          return metalMatch && v.option2.trim() === carat.trim();
        }) ?? null
      );
    },
    [products],
  );

  return { products, loading, getProduct, resolveVariant };
}
