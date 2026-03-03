// Centralized product data extracted from page-level constants and inline component definitions.
// Data shapes are preserved exactly as they were — no values, keys, or ordering has changed.

import { HomeProduct, HomeCollection } from '../types/common';
import { Product as CollectionProduct } from '../pages/collection/types';
import { Product as BoutiqueProduct } from '../pages/boutique/types';
import { Product as ProductShapeProduct } from '../pages/product-shape/types';

// ---------------------------------------------------------------------------
// Home page product data (previously in src/pages/home/constants.tsx)
// ---------------------------------------------------------------------------

const HOME_PLACEHOLDER = 'https://placehold.co/1200x1600/F9F6F1/D4C4A8?text=REPLACE+IMAGE';

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    id: 'ring-5',
    name: 'Hera Trilogy Three-Stone Ring',
    category: 'RINGS',
    price: '$4,800',
    image: HOME_PLACEHOLDER,
    shopifyHandle: 'hera-trilogy-three-stone-ring',
    description: 'Three stones. One story. A timeless expression of past, present, and future.'
  },
  {
    id: 'ring-10',
    name: 'Pavé Half Eternity Band',
    category: 'RINGS',
    price: '$2,600',
    image: HOME_PLACEHOLDER,
    shopifyHandle: 'pave-half-eternity-band',
    description: 'Brilliant diamonds set in a continuous pavé arc — effortless luxury.'
  },
  {
    id: 'ring-15',
    name: 'Signature Marquise Ring',
    category: 'RINGS',
    price: '$3,800',
    image: HOME_PLACEHOLDER,
    shopifyHandle: 'signature-marquise-ring',
    description: 'The elongated marquise — bold, architectural, and unmistakably ORÉA.'
  },
  {
    id: 'pendant-1',
    name: 'Solitaire Pendant',
    category: 'PENDANTS',
    price: '$1,200',
    image: HOME_PLACEHOLDER,
    shopifyHandle: 'solitaire-pendant',
    description: 'A single diamond, suspended in refined gold. Pure and enduring.'
  },
  {
    id: 'ring-9',
    name: 'Oval Solitaire Ring',
    category: 'RINGS',
    price: '$3,200',
    image: HOME_PLACEHOLDER,
    shopifyHandle: 'oval-solitaire-ring',
    description: 'The oval cut — a study in grace, proportion, and lasting brilliance.'
  },
  {
    id: 'necklace-5',
    name: 'Orbit Bezel Diamond Necklace',
    category: 'NECKLACES',
    price: '$1,800',
    image: HOME_PLACEHOLDER,
    shopifyHandle: 'orbit-bezel-diamond-necklace',
    description: 'A bezel-set diamond orbits gently — modern, minimal, and wearable every day.'
  }
];

export const HOME_COLLECTIONS: HomeCollection[] = [
  {
    id: 'rings',
    title: 'RINGS',
    image: HOME_PLACEHOLDER,
    link: '#rings'
  },
  {
    id: 'fine-jewellery',
    title: 'FINE JEWELLERY',
    image: HOME_PLACEHOLDER,
    link: '#fine-jewellery'
  },
  {
    id: 'bespoke',
    title: 'BESPOKE',
    image: HOME_PLACEHOLDER,
    link: '#bespoke'
  },
  {
    id: 'about',
    title: 'ABOUT ORÉA',
    image: HOME_PLACEHOLDER,
    link: '#about'
  }
];

// ---------------------------------------------------------------------------
// Collection page product data (previously in src/pages/collection/constants.ts)
// ---------------------------------------------------------------------------

export const COLLECTION_PRODUCTS: CollectionProduct[] = [
  // --- Bracelets ---
  {
    id: 'bracelet-1',
    name: 'Solitaire Bracelet',
    price: 1850,
    category: 'Bracelets',
    shape: 'Round',
    shopifyHandle: 'solitaire-bracelet',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'bracelet-2',
    name: 'Five-Stone Bezel Diamond Bracelet',
    price: 3200,
    category: 'Bracelets',
    shape: 'Round',
    shopifyHandle: 'five-stone-bezel-diamond-bracelet',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'bracelet-3',
    name: 'Floating Bezel Diamond Bracelet',
    price: 2400,
    category: 'Bracelets',
    shape: 'Round',
    shopifyHandle: 'floating-bezel-diamond-bracelet',
    imageUrl: '',
    hoverImageUrl: ''
  },
  // --- Pendants ---
  {
    id: 'pendant-1',
    name: 'Solitaire Pendant',
    price: 1450,
    category: 'Pendants',
    shape: 'Round',
    shopifyHandle: 'solitaire-pendant',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'pendant-2',
    name: 'Cross Diamond Pendant',
    price: 2100,
    category: 'Pendants',
    shape: 'Round',
    shopifyHandle: 'cross-diamond-pendant',
    imageUrl: '',
    hoverImageUrl: ''
  },
  // --- Earrings ---
  {
    id: 'earring-1',
    name: 'Solitaire Studs',
    price: 1250,
    category: 'Earrings',
    shape: 'Round',
    shopifyHandle: 'solitaire-studs',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'earring-2',
    name: 'Cascade Diamond Earrings',
    price: 2800,
    category: 'Earrings',
    shape: 'Round',
    shopifyHandle: 'cascade-diamond-earrings',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'earring-3',
    name: 'Clover Diamond Studs',
    price: 1950,
    category: 'Earrings',
    shape: 'Round',
    shopifyHandle: 'clover-diamond-studs',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'earring-4',
    name: 'Heart Diamond Studs',
    price: 1750,
    category: 'Earrings',
    shape: 'Heart',
    shopifyHandle: 'heart-diamond-studs',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'earring-5',
    name: 'Orbit Bezel Diamond Studs',
    price: 1600,
    category: 'Earrings',
    shape: 'Round',
    shopifyHandle: 'orbit-bezel-diamond-studs',
    imageUrl: '',
    hoverImageUrl: ''
  },
  // --- Necklaces ---
  {
    id: 'necklace-1',
    name: 'Solitaire Necklace',
    price: 1650,
    category: 'Necklaces',
    shape: 'Round',
    shopifyHandle: 'solitaire-necklace',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'necklace-2',
    name: 'Curved Bar Diamond Necklace',
    price: 2400,
    category: 'Necklaces',
    shape: 'Round',
    shopifyHandle: 'curved-bar-diamond-necklace',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'necklace-3',
    name: 'Floating Diamond Necklace',
    price: 1950,
    category: 'Necklaces',
    shape: 'Round',
    shopifyHandle: 'floating-diamond-necklace',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'necklace-4',
    name: 'Heart Diamond Necklace',
    price: 2100,
    category: 'Necklaces',
    shape: 'Heart',
    shopifyHandle: 'heart-diamond-necklace',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'necklace-5',
    name: 'Orbit Bezel Diamond Necklace',
    price: 1800,
    category: 'Necklaces',
    shape: 'Round',
    shopifyHandle: 'orbit-bezel-diamond-necklace',
    imageUrl: '',
    hoverImageUrl: ''
  },
  // --- Rings ---
  {
    id: 'ring-1',
    name: 'Alternating Diamond Band',
    price: 2800,
    category: 'Rings',
    shape: 'Round',
    shopifyHandle: 'alternating-diamond-band',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-2',
    name: 'Asscher Solitaire Ring',
    price: 3200,
    category: 'Rings',
    shape: 'Asscher',
    shopifyHandle: 'asscher-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-3',
    name: 'Cushion Solitaire Ring',
    price: 3200,
    category: 'Rings',
    shape: 'Cushion',
    shopifyHandle: 'cushion-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-4',
    name: 'Emerald Solitaire Ring',
    price: 3400,
    category: 'Rings',
    shape: 'Emerald',
    shopifyHandle: 'emerald-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-5',
    name: 'Hera Trilogy Three-Stone Ring',
    price: 4800,
    category: 'Rings',
    shape: 'Round',
    shopifyHandle: 'hera-trilogy-three-stone-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-6',
    name: 'Marquise Solitaire Ring',
    price: 3200,
    category: 'Rings',
    shape: 'Marquise',
    shopifyHandle: 'marquise-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-7',
    name: 'Nova Trilogy Three-Stone Ring',
    price: 5100,
    category: 'Rings',
    shape: 'Oval',
    shopifyHandle: 'nova-trilogy-three-stone-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-8',
    name: 'Oval Half Eternity Band',
    price: 3600,
    category: 'Rings',
    shape: 'Oval',
    shopifyHandle: 'oval-half-eternity-band',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-9',
    name: 'Oval Solitaire Ring',
    price: 3200,
    category: 'Rings',
    shape: 'Oval',
    shopifyHandle: 'oval-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-10',
    name: 'Pavé Half Eternity Band',
    price: 2600,
    category: 'Rings',
    shape: 'Round',
    shopifyHandle: 'pave-half-eternity-band',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-11',
    name: 'Pear Solitaire Ring',
    price: 3200,
    category: 'Rings',
    shape: 'Pear',
    shopifyHandle: 'pear-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-12',
    name: 'Princess Solitaire Ring',
    price: 3200,
    category: 'Rings',
    shape: 'Princess',
    shopifyHandle: 'princess-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-13',
    name: 'Radiant Solitaire Ring',
    price: 3400,
    category: 'Rings',
    shape: 'Radiant',
    shopifyHandle: 'radiant-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-14',
    name: 'Round Solitaire Ring',
    price: 3000,
    category: 'Rings',
    shape: 'Round',
    shopifyHandle: 'round-solitaire-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-15',
    name: 'Signature Marquise Ring',
    price: 3800,
    category: 'Rings',
    shape: 'Marquise',
    shopifyHandle: 'signature-marquise-ring',
    imageUrl: '',
    hoverImageUrl: ''
  },
  {
    id: 'ring-16',
    name: 'The Rosé Trilogy Ring',
    price: 5400,
    category: 'Rings',
    shape: 'Round',
    // No Shopify handle — this product is not in the current Shopify export
    imageUrl: '',
    hoverImageUrl: ''
  }
];

// ---------------------------------------------------------------------------
// Boutique page product — Emerald Solitaire Ring (Shopify ID: 10227771736345)
// Variants resolved by: option1 = Metal, option2 = Carat
// Ring Size is collected as a UI field and sent as a Shopify line item property
// ---------------------------------------------------------------------------

export const BOUTIQUE_PRODUCT: BoutiqueProduct = {
  id: 'emerald-solitaire-ring',
  name: 'Emerald Solitaire Ring',
  price: 3990,
  description: 'A celebration of modern love and classic architecture. The Emerald focal stone is held in a minimalist cathedral setting, meticulously engineered to allow your wedding band to sit completely flush.',
  materials: ['Solid 14k or 18k Gold', 'Platinum', 'IGI Certified Lab-Grown Diamond'],
  options: {
    metal: ['Platinum', '18k Yellow Gold', '18k White Gold', '14k Yellow Gold', '14k White Gold'],
    carat: ['1.0 CT', '1.5 CT', '2.0 CT', '2.5 CT', '3.0 CT', '3+ CT'],
    size: ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  },
  images: [
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-1_1200x.jpg?v=1710924432',
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-2_1200x.jpg?v=1710924432',
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-3_1200x.jpg?v=1710924432',
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-4_1200x.jpg?v=1710924432',
  ],
  variants: [
    // Platinum
    { id: 51813213929753, title: 'Platinum / 1.0 CT', option1: 'Platinum', option2: '1.0 CT', option3: 'L', price: 3990, available: true },
    { id: 51813214028057, title: 'Platinum / 1.5 CT', option1: 'Platinum', option2: '1.5 CT', option3: 'L', price: 4990, available: true },
    { id: 51813214126361, title: 'Platinum / 2.0 CT', option1: 'Platinum', option2: '2.0 CT', option3: 'L', price: 5990, available: true },
    { id: 51813214224665, title: 'Platinum / 2.5 CT', option1: 'Platinum', option2: '2.5 CT', option3: 'L', price: 6990, available: true },
    { id: 51813214322969, title: 'Platinum / 3.0 CT', option1: 'Platinum', option2: '3.0 CT', option3: 'L', price: 7990, available: true },
    // 18k Yellow Gold
    { id: 51813213995289, title: '18k Yellow Gold / 1.0 CT', option1: '18k Yellow Gold', option2: '1.0 CT', option3: 'L', price: 3990, available: true },
    { id: 51813214093593, title: '18k Yellow Gold / 1.5 CT', option1: '18k Yellow Gold', option2: '1.5 CT', option3: 'L', price: 4990, available: true },
    { id: 51813214191897, title: '18k Yellow Gold / 2.0 CT', option1: '18k Yellow Gold', option2: '2.0 CT', option3: 'L', price: 5990, available: true },
    { id: 51813214290201, title: '18k Yellow Gold / 2.5 CT', option1: '18k Yellow Gold', option2: '2.5 CT', option3: 'L', price: 6990, available: true },
    { id: 51813214388505, title: '18k Yellow Gold / 3.0 CT', option1: '18k Yellow Gold', option2: '3.0 CT', option3: 'L', price: 7990, available: true },
    // 18k White Gold
    { id: 51813213962521, title: '18k White Gold / 1.0 CT', option1: '18k White Gold', option2: '1.0 CT', option3: 'L', price: 3990, available: true },
    { id: 51813214060825, title: '18k White Gold / 1.5 CT', option1: '18k White Gold', option2: '1.5 CT', option3: 'L', price: 4990, available: true },
    { id: 51813214159129, title: '18k White Gold / 2.0 CT', option1: '18k White Gold', option2: '2.0 CT', option3: 'L', price: 5990, available: true },
    { id: 51813214257433, title: '18k White Gold / 2.5 CT', option1: '18k White Gold', option2: '2.5 CT', option3: 'L', price: 6990, available: true },
    { id: 51813214355737, title: '18k White Gold / 3.0 CT', option1: '18k White Gold', option2: '3.0 CT', option3: 'L', price: 7990, available: true },
    // 14k Yellow Gold
    { id: 51904822903065, title: '14k Yellow Gold / 1.0 CT', option1: '14k Yellow Gold', option2: '1.0 CT', option3: 'L', price: 3190, available: true },
    { id: 51904823591193, title: '14k Yellow Gold / 1.5 CT', option1: '14k Yellow Gold', option2: '1.5 CT', option3: 'L', price: 3990, available: true },
    { id: 51904824279321, title: '14k Yellow Gold / 2.0 CT', option1: '14k Yellow Gold', option2: '2.0 CT', option3: 'L', price: 4790, available: true },
    { id: 51904824967449, title: '14k Yellow Gold / 2.5 CT', option1: '14k Yellow Gold', option2: '2.5 CT', option3: 'L', price: 5590, available: true },
    { id: 51904825655577, title: '14k Yellow Gold / 3.0 CT', option1: '14k Yellow Gold', option2: '3.0 CT', option3: 'L', price: 6390, available: true },
    // 14k White Gold
    { id: 51904827031833, title: '14k White Gold / 1.0 CT', option1: '14k White Gold', option2: '1.0 CT', option3: 'L', price: 3190, available: true },
    { id: 51904827719961, title: '14k White Gold / 1.5 CT', option1: '14k White Gold', option2: '1.5 CT', option3: 'L', price: 3990, available: true },
    { id: 51904828473625, title: '14k White Gold / 2.0 CT', option1: '14k White Gold', option2: '2.0 CT', option3: 'L', price: 4790, available: true },
    { id: 51904829161753, title: '14k White Gold / 2.5 CT', option1: '14k White Gold', option2: '2.5 CT', option3: 'L', price: 5590, available: true },
    { id: 51904829849881, title: '14k White Gold / 3.0 CT', option1: '14k White Gold', option2: '3.0 CT', option3: 'L', price: 6390, available: true },
  ]
};

// ---------------------------------------------------------------------------
// Product-shape page product — Solitaire Necklace (Shopify ID: 10227211174169)
// Variants resolved by: option1 = Metal, option2 = Carat
// Diamond Shape is collected as a UI field and sent as a Shopify line item property
// ---------------------------------------------------------------------------

export const PRODUCT_SHAPE_PRODUCT: ProductShapeProduct = {
  id: 'solitaire-necklace',
  name: 'Solitaire Necklace',
  price: 2090,
  description: 'A celebration of modern love and classic architecture. A single diamond held in a minimalist pendant setting, meticulously engineered to catch the light from every angle.',
  materials: ['Solid 14k or 18k Gold', 'IGI Certified Lab-Grown Diamond'],
  options: {
    metal: ['18k Yellow Gold', '18k White Gold', '14k Yellow Gold', '14k White Gold'],
    shape: ['Round', 'Oval', 'Pear', 'Marquise', 'Princess', 'Emerald', 'Radiant', 'Asscher', 'Cushion', 'Heart'],
    carat: ['1.0 CT'],
    size: ['45cm']
  },
  images: [
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-1_1200x.jpg?v=1710924432',
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-2_1200x.jpg?v=1710924432',
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-3_1200x.jpg?v=1710924432',
    'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-4_1200x.jpg?v=1710924432',
  ],
  variants: [
    // Variant resolved by Metal only (shape is a line item property, carat defaults to 1.0 CT)
    { id: 51810620768537, title: '14k White Gold / 1.0 CT', option1: '14k White Gold', option2: '1.0 CT', price: 2090, available: true },
    { id: 51810620801305, title: '14k Yellow Gold / 1.0 CT', option1: '14k Yellow Gold', option2: '1.0 CT', price: 2090, available: true },
    { id: 51810620703001, title: '18k White Gold / 1.0 CT', option1: '18k White Gold', option2: '1.0 CT', price: 2690, available: true },
    { id: 51810620735769, title: '18k Yellow Gold / 1.0 CT', option1: '18k Yellow Gold', option2: '1.0 CT', price: 2690, available: true },
  ]
};
