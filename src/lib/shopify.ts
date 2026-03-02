/**
 * Shopify Storefront API Client
 *
 * Thin wrapper around the Storefront API (version 2024-01).
 * When VITE_SHOPIFY_DOMAIN / VITE_SHOPIFY_STOREFRONT_TOKEN are not set the
 * whole layer gracefully degrades to demo mode.
 */

/* ── Config ─────────────────────────────────────────────────── */

export const SHOPIFY_CONFIG = {
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN ?? '',
  token: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ?? '',
  get isConfigured() {
    return Boolean(this.domain && this.token);
  },
  get endpoint() {
    return `https://${this.domain}/api/2024-01/graphql.json`;
  },
};

/* ── Generic Fetch ──────────────────────────────────────────── */

export async function shopifyFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!SHOPIFY_CONFIG.isConfigured) {
    throw new Error('Shopify is not configured — running in demo mode.');
  }

  const res = await fetch(SHOPIFY_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data as T;
}

/* ── Cart Queries ───────────────────────────────────────────── */

export const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes { key value }
              merchandise { ... on ProductVariant { id title price { amount currencyCode } image { url altText } product { title handle } } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes { key value }
              merchandise { ... on ProductVariant { id title price { amount currencyCode } image { url altText } product { title handle } } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes { key value }
              merchandise { ... on ProductVariant { id title price { amount currencyCode } image { url altText } product { title handle } } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes { key value }
              merchandise { ... on ProductVariant { id title price { amount currencyCode } image { url altText } product { title handle } } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

export const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            attributes { key value }
            merchandise { ... on ProductVariant { id title price { amount currencyCode } image { url altText } product { title handle } } }
          }
        }
      }
    }
  }
`;

/* ── Customer Queries ───────────────────────────────────────── */

export const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

export const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id firstName lastName email }
      customerUserErrors { code field message }
    }
  }
`;

export const GET_CUSTOMER = `
  query getCustomer($token: String!) {
    customer(customerAccessToken: $token) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress { address1 city province zip country }
    }
  }
`;

export const CUSTOMER_RECOVER = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors { code field message }
    }
  }
`;

export const GET_CUSTOMER_ORDERS = `
  query getCustomerOrders($token: String!, $first: Int!) {
    customer(customerAccessToken: $token) {
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant { image { url altText } price { amount currencyCode } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/* ── Product Image Queries ───────────────────────────────────── */

export const GET_PRODUCT_IMAGES = `
  query getProductImages($handle: String!) {
    productByHandle(handle: $handle) {
      images(first: 10) {
        edges {
          node { url altText }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCT_IMAGES = `
  query getAllProductImages {
    products(first: 50) {
      edges {
        node {
          handle
          images(first: 2) {
            edges {
              node { url }
            }
          }
        }
      }
    }
  }
`;
