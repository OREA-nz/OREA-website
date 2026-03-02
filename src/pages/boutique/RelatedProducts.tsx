import React from 'react';
import { Link } from 'react-router-dom';
import { COLLECTION_PRODUCTS as PRODUCTS } from '../../data/products';
import { getRecommendations } from '../../lib/recommendations';

interface RelatedProductsProps {
  currentId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentId }) => {
  const recommended = getRecommendations(currentId, PRODUCTS as any[], 4);

  return (
    <div className="flex flex-col gap-16 px-[15px]">
      <div className="text-center flex flex-col gap-4">
        <h3 className="text-h3 font-light text-orea-dark font-serif uppercase tracking-wider">Recommended for you</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {recommended.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="group cursor-pointer text-center lg:text-left"
          >
            <div className="bg-orea-sand/20 aspect-square overflow-hidden mb-6 relative border border-orea-sand/20 flex items-center justify-center">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-micro uppercase tracking-widest text-orea-taupe/40 font-bold">
                  Insert Image
                </div>
              )}
              <div className="absolute inset-0 bg-orea-dark/0 group-hover:bg-orea-dark/5 transition-colors duration-500" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-micro font-bold uppercase tracking-wider text-orea-dark">
                {item.name}
              </h4>
              <p className="text-body-sm text-orea-taupe font-light">
                {item.price > 0 ? `$${item.price.toLocaleString()} NZD` : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
