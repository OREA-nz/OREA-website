import React from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  return (
    <div className="w-full p-[25px]">
      <div className="flex flex-col gap-[15px]">
        {images.map((img, idx) => (
          <div key={idx} className="w-full aspect-square bg-orea-sand/20 overflow-hidden">
            <img src={img || "/placeholder.svg"} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
