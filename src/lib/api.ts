// API infrastructure — placeholder functions only.
// These stubs are NOT wired into any active component.
// Implement these as Shopify Storefront API calls when the integration is ready.

/**
 * Fetches a single product by its Shopify handle or ID.
 * Replace with Storefront API `product` query.
 */
export async function fetchProduct(_idOrHandle: string): Promise<void> {
  // TODO: implement Shopify Storefront API product query
}

/**
 * Fetches all products in a collection by collection handle.
 * Replace with Storefront API `collection.products` query.
 */
export async function fetchCollectionProducts(_collectionHandle: string): Promise<void> {
  // TODO: implement Shopify Storefront API collection products query
}

/**
 * Fetches the current customer's cart by cart ID.
 * Replace with Storefront API `cart` query.
 */
export async function fetchCart(_cartId: string): Promise<void> {
  // TODO: implement Shopify Storefront API cart query
}

/**
 * Creates a new cart and optionally adds line items.
 * Replace with Storefront API `cartCreate` mutation.
 */
export async function createCart(): Promise<void> {
  // TODO: implement Shopify Storefront API cartCreate mutation
}

/**
 * Adds one or more line items to an existing cart.
 * Replace with Storefront API `cartLinesAdd` mutation.
 */
export async function addCartLines(_cartId: string, _lines: unknown[]): Promise<void> {
  // TODO: implement Shopify Storefront API cartLinesAdd mutation
}

/**
 * Removes one or more line items from an existing cart.
 * Replace with Storefront API `cartLinesRemove` mutation.
 */
export async function removeCartLines(_cartId: string, _lineIds: string[]): Promise<void> {
  // TODO: implement Shopify Storefront API cartLinesRemove mutation
}

/**
 * Updates line item quantities in an existing cart.
 * Replace with Storefront API `cartLinesUpdate` mutation.
 */
export async function updateCartLines(_cartId: string, _lines: unknown[]): Promise<void> {
  // TODO: implement Shopify Storefront API cartLinesUpdate mutation
}

/**
 * Creates a checkout URL for a given cart.
 * Replace with Storefront API `cartBuyerIdentityUpdate` or direct checkout URL derivation.
 */
export async function createCheckoutUrl(_cartId: string): Promise<void> {
  // TODO: implement checkout URL creation
}

/**
 * Authenticates a customer with email and password.
 * Replace with Storefront API `customerAccessTokenCreate` mutation.
 */
export async function loginCustomer(_email: string, _password: string): Promise<void> {
  // TODO: implement Shopify customer login
}

/**
 * Logs out the current customer by invalidating their access token.
 * Replace with Storefront API `customerAccessTokenDelete` mutation.
 */
export async function logoutCustomer(_accessToken: string): Promise<void> {
  // TODO: implement Shopify customer logout
}

/**
 * Fetches the currently authenticated customer's profile data.
 * Replace with Storefront API `customer` query.
 */
export async function fetchCustomer(_accessToken: string): Promise<void> {
  // TODO: implement Shopify customer profile fetch
}
