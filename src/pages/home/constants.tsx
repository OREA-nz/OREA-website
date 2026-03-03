// Types are now consolidated in src/types/common.ts.
// Data is now centralized in src/data/products.ts.
// This file re-exports for backwards-compatible local imports within the home directory.

export { HOME_PRODUCTS as PRODUCTS, HOME_COLLECTIONS as COLLECTIONS } from '../../data/products';
