
export interface Variant {
  id: number; // Shopify Variant ID
  title: string; // e.g., "Platinum / 1.0CT / H"
  option1: string; // Metal
  option2: string; // Carat
  option3: string; // Size
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  materials: string[];
  options: {
    metal: string[];
    carat: string[];
    size: string[];
  };
  images: string[];
  variants?: Variant[]; // Optional for Shopify integration
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
