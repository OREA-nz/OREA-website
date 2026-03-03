
export type Category = 'All' | 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Pendants';

export type DiamondShape = 'Round' | 'Oval' | 'Pear' | 'Marquise' | 'Princess' | 'Emerald' | 'Radiant' | 'Asscher' | 'Cushion' | 'Heart';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  shape?: DiamondShape;
  shopifyHandle?: string; // Shopify product handle for live image fetching
  imageUrl: string;
  hoverImageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}
