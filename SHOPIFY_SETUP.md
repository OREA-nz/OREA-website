# Shopify Integration Setup Guide

## Overview

ORÉA uses the **Shopify Storefront API (GraphQL)** to power the cart and checkout.
This is the official Shopify approach for headless frontends and fully supports
cross-origin requests from Vercel — no CORS issues.

---

## Step 1 — Install the Shopify Headless Channel

The Storefront API public token is obtained through Shopify's **Headless sales channel**
(free, made by Shopify). This is different from the Admin API / Dev Dashboard.

1. In your **Shopify Admin**, go to **Sales channels** in the left sidebar
2. Click the **+** button → search for **"Headless"** → install it
   - Alternatively: [Shopify App Store — Headless channel](https://apps.shopify.com/headless)

---

## Step 2 — Create a Storefront & Get Your Token

1. In Shopify Admin → **Sales channels → Headless**
2. Click **"Add storefront"**
3. Name it (e.g. `ORÉA Vercel Frontend`) → click **"Create storefront"**
4. Shopify generates two tokens — copy the **Public access token** immediately
   (Shopify only displays it once)

| Token | Use |
|---|---|
| **Public access token** | ✅ This is your `VITE_SHOPIFY_STOREFRONT_TOKEN` |
| Private access token | ❌ Server-side only — do not use in the frontend |

---

## Step 3 — Configure Storefront API Permissions

Still in the Headless channel → your storefront → click **"Edit"** next to
**"Storefront API permissions"** → enable:

- `unauthenticated_read_product_listings`
- `unauthenticated_write_checkouts`
- `unauthenticated_read_checkouts`

---

## Step 4 — Set Environment Variables

### Local development
Create a `.env.local` file (copy from `.env.example`):
```
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-public-access-token
```

### Vercel deployment
1. Go to your project in the **Vercel Dashboard**
2. **Settings → Environment Variables**
3. Add both variables:
   - `VITE_SHOPIFY_DOMAIN` = `your-store.myshopify.com`
   - `VITE_SHOPIFY_STOREFRONT_TOKEN` = `your-public-access-token`
4. Redeploy the project

---

## Step 5 — Add Vercel Domain to CORS Allowed List

In the Headless channel → your storefront → **"Storefront API permissions"**
→ add your allowed domains:

- `https://your-vercel-app.vercel.app`
- `https://your-custom-domain.com`
- `http://localhost:3000` (for local development)

---

## How the Code Works

### API endpoint & authentication (`src/lib/shopify.ts`)
```
POST https://your-store.myshopify.com/api/2024-01/graphql.json
Header: X-Shopify-Storefront-Access-Token: <public token>
```

### Variant resolution
- `public/products.json` maps every product → Shopify Product ID + all variants
- Each variant has `option1` (Metal), `option2` (Carat), and a real numeric `variantId`
- When a customer selects Metal + Carat, the frontend finds the matching variant

### Line item properties
- **Ring Size** → sent as `attributes: [{ key: "Ring Size", value: "L" }]`
- **Diamond Shape** → sent as `attributes: [{ key: "Diamond Shape", value: "Round" }]`
- Both appear in Shopify order details and fulfilment notes
- Neither affects price or stock — they are informational properties only

### Checkout
- The "Secure Checkout" button links directly to `cart.checkoutUrl` from Shopify
- All payment processing happens on Shopify's hosted checkout

---

## Graceful Degradation (Demo Mode)

If the env vars are not set, the app runs in demo mode:
- Add to Bag opens the cart drawer and tracks items in `localStorage`
- No Shopify API calls are made
- The checkout button shows a placeholder
- Useful for UI work without a live Shopify connection

---

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---|---|
| Using the Admin API token from Dev Dashboard | Use the **public** token from the Headless channel |
| Using the private access token in the frontend | Private tokens are server-side only |
| AJAX Cart API (`/cart/add.js`) | Storefront API GraphQL — works cross-origin |
| Committing `.env.local` to git | `.env.local` is in `.gitignore` |
