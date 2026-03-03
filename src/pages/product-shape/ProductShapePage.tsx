'use client';

import React, { useState, useMemo } from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductTabs from './ProductTabs';
import ValueProps from './ValueProps';
import RelatedProducts from './RelatedProducts';
import { PRODUCT_SHAPE_PRODUCT as DEFAULT_OREA_PRODUCT } from '../../data/products';
import { useShopifyProductVariants } from '../../hooks/useShopifyProductVariants';

const ProductPage: React.FC = () => {
  const [selectedMetal, setSelectedMetal] = useState(DEFAULT_OREA_PRODUCT.options.metal[0] || '');
  const [selectedShape, setSelectedShape] = useState('Emerald');

  // Live prices and images — falls back gracefully when Shopify is not configured
  const { liveVariants, liveImages } = useShopifyProductVariants('solitaire-necklace');
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
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] pb-[120px] -mb-[120px]">
      <main className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full overflow-hidden">
            <ProductGallery images={galleryImages} />
          </div>

          <div className="px-6 py-12 lg:px-16 xl:px-24 flex flex-col items-center">
            <div className="w-full max-w-xl lg:sticky lg:top-12 flex flex-col gap-12">
              <ProductDetails
                product={mergedProduct}
                selectedMetal={selectedMetal}
                setSelectedMetal={setSelectedMetal}
                selectedShape={selectedShape}
                setSelectedShape={setSelectedShape}
              />
              <ProductTabs selectedShape={selectedShape} />
              <ValueProps />
            </div>
          </div>
        </div>

        <div className="w-full max-w-container mx-auto px-4 lg:px-12">
          <section className="mt-40 border-t border-orea-sand pt-24">
            <RelatedProducts currentId={DEFAULT_OREA_PRODUCT.id} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
