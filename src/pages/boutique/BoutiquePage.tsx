'use client';

import React, { useState, useMemo } from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductTabs from './ProductTabs';
import ValueProps from './ValueProps';
import CompleteTheLook from './CompleteTheLook';
import RelatedProducts from './RelatedProducts';
import { BOUTIQUE_PRODUCT as DEFAULT_OREA_PRODUCT } from '../../data/products';
import { useShopifyProductVariants } from '../../hooks/useShopifyProductVariants';

const BoutiquePage: React.FC = () => {
  const [selectedMetal, setSelectedMetal] = useState(DEFAULT_OREA_PRODUCT.options.metal[0] || '');
  const [selectedCarat, setSelectedCarat] = useState(DEFAULT_OREA_PRODUCT.options.carat[0] || '');
  const [selectedSize, setSelectedSize] = useState('L');

  // Live prices and images — falls back gracefully when Shopify is not configured
  const { liveVariants, liveImages } = useShopifyProductVariants('emerald-solitaire-ring');
  const galleryImages = liveImages.length > 0 ? liveImages : DEFAULT_OREA_PRODUCT.images;

  const mergedProduct = useMemo(() => {
    if (!liveVariants.length) return DEFAULT_OREA_PRODUCT;
    return {
      ...DEFAULT_OREA_PRODUCT,
      variants: DEFAULT_OREA_PRODUCT.variants.map(v => {
        const live = liveVariants.find(lv => lv.id === v.id);
        return { ...v, price: live?.price ?? v.price };
      }),
    };
  }, [liveVariants]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-[120px] -mb-[120px]">
      <main>
        <div className="max-w-wide mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full">
            <ProductGallery images={galleryImages} />
          </div>

          <div className="px-6 py-12 lg:px-16 xl:px-24">
            <div className="lg:sticky lg:top-28 flex flex-col gap-12">
              <ProductDetails
                product={mergedProduct}
                selectedMetal={selectedMetal}
                setSelectedMetal={setSelectedMetal}
                selectedCarat={selectedCarat}
                setSelectedCarat={setSelectedCarat}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <ProductTabs />
              <ValueProps />
            </div>
          </div>
        </div>

        <div className="max-w-container mx-auto px-6 py-24 flex flex-col gap-32">
          <CompleteTheLook />
          <RelatedProducts currentId={DEFAULT_OREA_PRODUCT.id} />
        </div>
      </main>
    </div>
  );
};

export default BoutiquePage;
