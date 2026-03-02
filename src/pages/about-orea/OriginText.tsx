import React from 'react';
import { Link } from 'react-router-dom';

export const OriginText: React.FC = () => {
  return (
    <section className="py-section border-t border-orea-linen">
      <div className="max-w-content mx-auto text-center flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-caption uppercase tracking-[0.45em] text-orea-taupe font-semibold">Lab-Grown, Always</h4>
          <h2 className="text-body-lg md:text-h3 font-serif text-orea-dark leading-snug">
            {'ORÉA works exclusively with certified lab-grown diamonds.'}
          </h2>
        </div>
        
        <div className="flex flex-col gap-8 text-orea-taupe font-light text-body-lg leading-relaxed">
          <p className="text-body md:text-body-lg">
            {'They are real diamonds, identical in beauty and structure\u00A0— the difference is their origin.'}
          </p>
          <p>
            This is not an alternative for us, but the future of responsible fine jewellery.
          </p>
        </div>

        <div className="pt-6">
          <Link 
            to="/diamonds" 
            className="text-body-sm uppercase tracking-[0.45em] font-semibold text-orea-dark border-b border-orea-dark pb-2 hover:text-orea-earth hover:border-orea-earth transition-all"
          >
            {'Learn more about diamonds →'}
          </Link>
        </div>
      </div>
    </section>
  );
};
