'use client';

import React, { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductTabs from './ProductTabs';
import ValueProps from './ValueProps';
import CompleteTheLook from './CompleteTheLook';
import RelatedProducts from './RelatedProducts';
import { BOUTIQUE_PRODUCT as DEFAULT_OREA_PRODUCT } from '../../data/products';
import { useShopifyProductImages } from '../../hooks/useShopifyImages';

const BoutiquePage: React.FC = () => {
  const [selectedMetal, setSelectedMetal] = useState(DEFAULT_OREA_PRODUCT.options.metal[0] || '');
  const [selectedCarat, setSelectedCarat] = useState(DEFAULT_OREA_PRODUCT.options.carat[0] || '');
  const [selectedSize, setSelectedSize] = useState('L');

  // Live images from Shopify — falls back to static images when not configured
  const { images: liveImages } = useShopifyProductImages('emerald-solitaire-ring');
  const galleryImages = liveImages.length > 0 ? liveImages : DEFAULT_OREA_PRODUCT.images;

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
                product={DEFAULT_OREA_PRODUCT}
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
