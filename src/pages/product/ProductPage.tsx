'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductTabs from './ProductTabs';
import ValueProps from './ValueProps';
import RelatedProducts from './RelatedProducts';

import { Product } from './types';
import { PRODUCTS } from '../collection/constants';
import { useShopifyProducts } from '../../hooks/useShopifyProducts';
import { useShopifyProductVariants } from '../../hooks/useShopifyProductVariants';

// Rings with no carat selector (bands / multi-stone designs)
const NO_CARAT_RINGS = [
  'Alternating Diamond Band',
  'Hera Trilogy Three-Stone Ring',
  'Nova Trilogy Three-Stone Ring',
  'The Rosé Trilogy Ring',
  'Oval Half Eternity Band',
  'Pavé Half Eternity Band',
];

const RING_SIZE_OPTIONS = ['F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const SHAPE_OPTIONS    = ['Round','Oval','Emerald','Pear','Marquise','Princess','Radiant','Asscher','Cushion','Heart'];
const FALLBACK_IMAGE   = 'https://www.orea.co.nz/cdn/shop/files/ClassicSolitaireRing-Emerald-1_1200x.jpg?v=1710924432';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useShopifyProducts();

  // Resolve base product — URL :id may be a shopifyHandle or a static product id
  const base = useMemo(
    () => PRODUCTS.find(p => p.shopifyHandle === id) ?? PRODUCTS.find(p => p.id === id),
    [id],
  );

  const isRing = base?.category === 'Rings';

  // Live variant prices + images (no-op when Shopify not configured)
  const { liveVariants, liveImages } = useShopifyProductVariants(base?.shopifyHandle ?? '');

  // Build the full Product object consumed by ProductDetails
  const product: Product | undefined = useMemo(() => {
    if (!base) return undefined;

    const isRingProduct = base.category === 'Rings';
    const hasCarat      = isRingProduct && !NO_CARAT_RINGS.includes(base.name);
    const shopifyData   = base.shopifyHandle ? getProduct(base.shopifyHandle) : null;

    let variants:    NonNullable<Product['variants']>;
    let metalOptions: string[];
    let caratOptions: string[];

    if (shopifyData?.variants?.length) {
      // Real Shopify variants: option1 = Metal, option2 = Carat (empty for metal-only)
      variants = shopifyData.variants.map(v => {
        const live = liveVariants.find(lv => lv.id === parseInt(v.variantId, 10));
        return {
          id:        parseInt(v.variantId, 10),
          title:     v.title,
          option1:   v.option1,
          option2:   v.option2,
          price:     live?.price ?? v.price,
          available: true,
        };
      });
      metalOptions = [...new Set(variants.map(v => v.option1))];
      caratOptions = [...new Set(variants.map(v => v.option2).filter(Boolean))];
    } else {
      // Fallback for demo / offline mode
      const metals = isRingProduct
        ? ['Platinum', '18k Yellow Gold', '18k White Gold', '14k Yellow Gold', '14k White Gold']
        : ['18k Yellow Gold', '18k White Gold', '14k Yellow Gold', '14k White Gold'];
      const carats = hasCarat
        ? ['1.0 CT', '1.5 CT', '2.0 CT', '2.5 CT', '3.0 CT', '3+ CT']
        : [];
      metalOptions = metals;
      caratOptions = carats;
      variants = metals.flatMap((metal, mi) =>
        carats.length
          ? carats.map((carat, ci) => ({
              id:        mi * carats.length + ci + 1,
              title:     `${metal} / ${carat}`,
              option1:   metal,
              option2:   carat,
              price:     base.price,
              available: true,
            }))
          : [{
              id:        mi + 1,
              title:     metal,
              option1:   metal,
              option2:   '',
              price:     base.price,
              available: true,
            }],
      );
    }

    const images = liveImages.length > 0
      ? liveImages
      : base.imageUrl ? [base.imageUrl] : [FALLBACK_IMAGE];

    return {
      ...base,
      description: 'Signature ORÉA fine jewellery piece crafted with precision.',
      materials: isRingProduct
        ? ['14k Gold', '18k Gold', 'Platinum', 'Lab Grown Diamond']
        : ['14k Gold', '18k Gold', 'Lab Grown Diamond'],
      images,
      options: {
        metal: metalOptions,
        shape: SHAPE_OPTIONS,
        carat: caratOptions,
        size:  isRingProduct ? RING_SIZE_OPTIONS : ['Standard'],
      },
      variants,
    } as Product;
  }, [base, getProduct, liveVariants, liveImages]);

  // Selected-option state — initialised empty, populated/reset via useEffect
  // so that navigating between products always resets to the new product's defaults
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedCarat, setSelectedCarat] = useState('');
  const [selectedShape, setSelectedShape] = useState('Round');
  const [selectedSize,  setSelectedSize]  = useState('L');

  useEffect(() => {
    if (!product) return;
    setSelectedMetal(product.options.metal[0] ?? '');
    setSelectedCarat(product.options.carat[0] ?? '');
    setSelectedShape('Round');
    setSelectedSize(isRing ? 'L' : 'Standard');
  }, [base?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <RelatedProducts currentId={base.id} />
        </section>
      </main>
    </div>
  );
};

export default ProductPage;
