
export interface Variant {
  id: number; // Shopify Variant ID
  title: string; // e.g., "Platinum / Round"
  option1: string; // Metal
  option2: string; // Shape
  option3?: string; // Additional (unused for now)
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
    shape: string[];
    carat?: string[];
    size?: string[];
  };
  images: string[];
  variants?: Variant[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
