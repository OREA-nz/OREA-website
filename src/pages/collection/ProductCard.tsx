'use client';

import React, { useState } from 'react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayImage = isHovered ? product.hoverImageUrl : product.imageUrl;

  return (
    <div
      className="group cursor-pointer flex flex-col gap-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-orea-linen/40 flex items-center justify-center">
        {displayImage ? (
          <img
            src={displayImage || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out scale-100 group-hover:scale-105"
          />
        ) : (
          <div className="text-caption uppercase tracking-widest text-orea-taupe/50 text-center px-4">
            Product Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col items-center text-center gap-2 pb-8">
        <h3 className="font-serif text-body-sm md:text-body font-medium uppercase tracking-[0.2em] text-orea-dark leading-[1.7]">
          {product.name}
        </h3>
        <p className="text-caption text-orea-taupe font-light tracking-[0.15em] leading-relaxed">
          ${product.price.toLocaleString('en-NZ')} NZD
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
