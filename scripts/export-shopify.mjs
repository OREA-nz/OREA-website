#!/usr/bin/env node
/**
 * export-shopify.mjs
 *
 * Fetches all products from the Shopify Storefront API and writes
 * public/products.json in the format consumed by useShopifyProducts.
 *
 * Usage:
 *   node scripts/export-shopify.mjs
 *
 * Requires VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN to be set
 * in .env.local (or as environment variables).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/* ── Load env vars ─────────────────────────────────────────────── */

function loadEnv() {
  const env = { ...process.env };
  for (const file of ['.env.local', '.env']) {
    const path = resolve(ROOT, file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!(key in env)) env[key] = val; // env vars take precedence
    }
    break; // only load the first found file
  }
  return env;
}

const env = loadEnv();
const DOMAIN = env.VITE_SHOPIFY_DOMAIN;
const TOKEN = env.VITE_SHOPIFY_STOREFRONT_TOKEN;

if (!DOMAIN || !TOKEN) {
  console.log('Shopify export skipped (VITE_SHOPIFY_DOMAIN or VITE_SHOPIFY_STOREFRONT_TOKEN not set)');
  process.exit(0);
}

const ENDPOINT = `https://${DOMAIN}/api/2024-01/graphql.json`;

/* ── GraphQL helpers ───────────────────────────────────────────── */

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join('; '));
  return json.data;
}

function gidToNumber(gid) {
  return gid.split('/').pop();
}

/* ── Queries ───────────────────────────────────────────────────── */

const GET_ALL_PRODUCTS = `
  query getAllProducts($cursor: String) {
    products(first: 250, after: $cursor, sortKey: TITLE) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      variants(first: 100) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

/* ── Main ──────────────────────────────────────────────────────── */

async function fetchAllHandles() {
  const handles = [];
  let cursor = null;

  do {
    const data = await shopifyFetch(GET_ALL_PRODUCTS, cursor ? { cursor } : {});
    for (const { node } of data.products.edges) {
      handles.push(node.handle);
    }
    cursor = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null;
  } while (cursor);

  return handles;
}

async function fetchProduct(handle) {
  const data = await shopifyFetch(GET_PRODUCT_BY_HANDLE, { handle });
  return data.productByHandle;
}

function buildVariant(node) {
  const opts = node.selectedOptions ?? [];
  const option1 = opts[0]?.value ?? '';
  const option2 = opts[1]?.value ?? '';
  return {
    variantId: gidToNumber(node.id),
    title: node.title,
    option1,
    option2,
    price: Math.round(parseFloat(node.price.amount)),
  };
}

async function main() {
  console.log(`Fetching products from ${DOMAIN}…`);

  const handles = await fetchAllHandles();
  console.log(`  Found ${handles.length} products. Fetching variants…`);

  const output = { products: {} };

  for (const handle of handles) {
    try {
      const product = await fetchProduct(handle);
      if (!product) continue;
      output.products[handle] = {
        shopifyId: gidToNumber(product.id),
        title: product.title,
        variants: product.variants.edges.map(e => buildVariant(e.node)),
      };
    } catch (err) {
      console.warn(`  Warning: skipping "${handle}" — ${err.message}`);
    }
  }

  const outPath = resolve(ROOT, 'public', 'products.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

  const count = Object.keys(output.products).length;
  console.log(`  Exported ${count} products to public/products.json`);
}

main().catch(err => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
