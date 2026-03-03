// Shared types consolidated from previously duplicated page-level type files.
// faq/types.ts, returns/types.ts, and shipping/types.ts were confirmed identical
// and are now unified here.

export interface FAQItem {
  question: string;
  answer: string | string[];
}

export interface NavLink {
  label: string;
  href: string;
}

// From home/types.ts — Product and Collection shapes used by home page constants.
// NOTE: This is a distinct Product interface from the boutique/product/product-shape
// Product interfaces (those have variants, materials, etc.) and must not be merged.
export interface HomeProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  shopifyHandle?: string; // Shopify product handle for live image fetching
}

export interface HomeCollection {
  id: string;
  title: string;
  image: string;
  link: string;
}

// Shared chat message type (was duplicated across home, boutique, product, product-shape types).
export interface Message {
  role: 'user' | 'model';
  text: string;
}
