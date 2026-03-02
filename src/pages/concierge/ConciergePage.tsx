'use client';

import React from 'react';
import { KEY_DETAILS, SERVICES_LIST } from './constants';
import { Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CONCIERGE_IMAGE = '/images/concierge.jpg';

const ConciergePage: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: 'concierge-service',
      name: 'ORÉA Concierge Service',
      price: 249,
      image: CONCIERGE_IMAGE,
      productHandle: 'concierge',
    });
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column: Single portrait image */}
      <div className="w-full">
        <div className="w-full aspect-[3/4] bg-orea-sand/30 overflow-hidden">
          <img
            src={CONCIERGE_IMAGE}
            alt="ORÉA Concierge Service"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="px-6 py-12 lg:px-16 xl:px-24">
        <header className="mb-12">
          <h1 className="font-serif text-h1 font-light tracking-tight mb-4 text-orea-dark">
            ORÉA Concierge Service
          </h1>
          <p className="text-h4 font-light text-orea-taupe mb-6">
            $249.00 NZD
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-orea-dark text-orea-cream py-4 px-8 uppercase tracking-widest text-body-sm font-medium hover:bg-orea-taupe transition-all duration-300 mb-8 active:scale-[0.99]"
          >
            Add to Cart
          </button>
          <div className="w-full h-px bg-orea-linen" />
        </header>

        <div className="flex flex-col gap-12 max-w-xl">
          {/* Main Description */}
          <section>
            <h3 className="font-serif uppercase tracking-widest text-caption font-bold text-orea-taupe mb-5">
              Description
            </h3>
            <div className="flex flex-col gap-6 text-body leading-relaxed text-orea-dark font-light">
              <p>
                All ORÉA pieces are crafted in solid 14k or 18k gold -- never plated, filled, or vermeil. Fine gold is made to last, while remaining naturally malleable. With everyday wear, light scratches are expected and become part of the piece's character over time.
              </p>
              <p>
                For up to three years, the ORÉA Concierge Service provides professional care for your jewellery, including polishing, repairs, and stone resetting. All return shipping and reshipment costs are fully covered.
              </p>
              <p>
                To activate the service, add it to your cart and retain your order number. When you're ready to use your coverage, email <a href="mailto:hello@orea.co.nz" className="underline underline-offset-4 decoration-orea-gold hover:text-orea-dark transition-colors">hello@orea.co.nz</a> with your order number and the care required.
              </p>
              <p className="font-normal text-body-sm">
                <strong>Please note:</strong> each Concierge Service applies to one jewellery piece only. Coverage for multiple pieces requires a separate service per item. Concierge Service is non-refundable.
              </p>
            </div>
          </section>

          {/* What's Included */}
          <section>
            <h3 className="font-serif uppercase tracking-widest text-caption font-bold text-orea-taupe mb-5">
              What's Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-body-sm text-orea-dark">
              {SERVICES_LIST.map((service, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-orea-gold rounded-full" />
                  {service}
                </div>
              ))}
            </div>
          </section>

          {/* Key Details Block */}
          <section className="bg-orea-cream/40 p-8 border border-orea-linen rounded-sm">
            <h3 className="font-serif uppercase tracking-widest text-caption font-bold text-orea-taupe mb-6">
              Key Details
            </h3>
            <ul className="flex flex-col gap-4">
              {KEY_DETAILS.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-body-sm text-orea-taupe font-light leading-snug">
                  <Check size={14} className="mt-0.5 text-orea-gold flex-shrink-0" />
                  {detail.label}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="mt-section pt-10 border-t border-orea-linen text-caption text-orea-taupe uppercase tracking-widest text-center">
          premium care
        </footer>
      </div>
    </main>
  );
};

export default ConciergePage;
