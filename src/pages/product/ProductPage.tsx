'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductTabs from './ProductTabs';
import ValueProps from './ValueProps';
import RelatedProducts from './RelatedProducts';

import { Product } from './types';
import { PRODUCTS } from '../collection/constants';

const ProductPage: React.FC = () => {
  const { id } = useParams();

  const isRing = useMemo(() => {
    const base = PRODUCTS.find(p => p.id === id);
    return base?.category === 'Rings';
  }, [id]);

  const product: Product | undefined = useMemo(() => {
    const base = PRODUCTS.find(p => p.id === id);
    if (!base) return undefined;

    const NO_CARAT_RINGS = [
      'Alternating Diamond Band',
      'Hera Trilogy Three-Stone Ring',
      'Nova Trilogy Three-Stone Ring',
      'The Rosé Trilogy Ring',
      'Oval Half Eternity Band',
      'Pavé Half Eternity Band'
    ];

    const ringOptions = {
      metal: ['Platinum', '18k Yellow Gold', '18k White Gold', '14k Yellow Gold', '14k White Gold'],
      shape: ['Round', 'Oval', 'Emerald', 'Pear', 'Marquise', 'Princess', 'Radiant', 'Asscher', 'Cushion', 'Heart'],
      carat: NO_CARAT_RINGS.includes(base.name) ? [] : ['1.0CT', '1.5CT', '2.0CT', '2.5CT', '3.0CT', '3+ ct'],
      size: ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    };

    const defaultOptions = {
      metal: ['18k Yellow Gold', '18k White Gold', '14k Yellow Gold', '14k White Gold'],
      shape: ['Round', 'Oval', 'Pear', 'Marquise', 'Princess', 'Emerald', 'Radiant', 'Asscher', 'Cushion', 'Heart'],
      carat: ['1.0CT'],
      size: ['Standard']
    };

    const isRingProduct = base.category === 'Rings';

    const ringVariants = [
      {
        id: 1,
        title: 'Platinum / Emerald',
        option1: 'Platinum',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 2,
        title: '18k Yellow Gold / Emerald',
        option1: '18k Yellow Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 3,
        title: '18k White Gold / Emerald',
        option1: '18k White Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 4,
        title: '14k Yellow Gold / Emerald',
        option1: '14k Yellow Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 5,
        title: '14k White Gold / Emerald',
        option1: '14k White Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      }
    ];

    const nonRingVariants = [
      {
        id: 1,
        title: '18k Yellow Gold / Emerald',
        option1: '18k Yellow Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 2,
        title: '18k White Gold / Emerald',
        option1: '18k White Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 3,
        title: '14k Yellow Gold / Emerald',
        option1: '14k Yellow Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      },
      {
        id: 4,
        title: '14k White Gold / Emerald',
        option1: '14k White Gold',
        option2: 'Emerald',
        price: base.price,
        available: true
      }
    ];

    return {
      ...base,
      description: 'Signature ORÉA fine jewellery piece crafted with precision.',
      materials: isRingProduct
        ? ['14k Gold', '18k Gold', 'Platinum', 'Lab Grown Diamond']
        : ['14k Gold', '18k Gold', 'Lab Grown Diamond'],
      images: base.imageUrl
        ? [base.imageUrl]
        : [
            'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-1_1200x.jpg?v=1710924432'
          ],
      options: isRingProduct ? ringOptions : defaultOptions,
      variants: isRingProduct ? ringVariants : nonRingVariants
    } as Product;
  }, [id]);

  const [selectedMetal, setSelectedMetal] = useState(
    product?.options.metal[0] || ''
  );
  const [selectedShape, setSelectedShape] = useState(
    product?.options.shape[0] || 'Emerald'
  );
  const [selectedCarat, setSelectedCarat] = useState(
    product?.options.carat[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    isRing ? 'L' : 'Standard'
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orea-dark">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] pb-[120px] -mb-[120px]">
      <main className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <div className="px-6 py-12 lg:px-16 xl:px-24">
            <div className="max-w-xl flex flex-col gap-12">
              <ProductDetails
                product={product}
                selectedMetal={selectedMetal}
                setSelectedMetal={setSelectedMetal}
                selectedShape={selectedShape}
                setSelectedShape={setSelectedShape}
                isRing={isRing}
                selectedCarat={selectedCarat}
                setSelectedCarat={setSelectedCarat}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <ProductTabs selectedShape={selectedShape} />
              <ValueProps />
            </div>
          </div>
        </div>

        <section className="mt-40 border-t border-orea-sand pt-24">
          <RelatedProducts currentId={id || ''} />
        </section>
      </main>
    </div>
  );
};

export default ProductPage;
