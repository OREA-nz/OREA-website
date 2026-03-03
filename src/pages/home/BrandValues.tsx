
import React from 'react';
import { Sparkle, ShieldCheck, MapPin } from 'lucide-react';

const BrandValues: React.FC = () => {
  return (
    <section className="py-section-sm md:py-section bg-[#FFFFFF]">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
          
          {/* Value 1: Lab-Grown */}
          <div className="flex flex-col items-center text-center gap-6 px-4 md:px-8 py-10 md:py-0 border-b border-orea-champagne/10 md:border-b-0">
            <Sparkle size={18} strokeWidth={1} className="text-orea-gold" />
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-orea-dark text-caption tracking-[0.4em] uppercase font-semibold leading-none">
                Lab-Grown Only
              </span>
              <span className="text-orea-taupe text-micro tracking-[0.3em] uppercase font-light leading-none">
                Never mined.
              </span>
            </div>
          </div>

          {/* Value 2: Solid Gold */}
          <div className="flex flex-col items-center text-center gap-6 px-4 md:px-8 py-10 md:py-0 md:border-x md:border-orea-champagne/30 border-b border-orea-champagne/10 md:border-b-0">
            <ShieldCheck size={18} strokeWidth={1} className="text-orea-gold" />
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-orea-dark text-caption tracking-[0.4em] uppercase font-semibold leading-none">
                Solid Gold - Always
              </span>
              <span className="text-orea-taupe text-micro tracking-[0.3em] uppercase font-light leading-none">
                14k, 18k, Platinum
              </span>
            </div>
          </div>

          {/* Value 3: Made to Order */}
          <div className="flex flex-col items-center text-center gap-6 px-4 md:px-8 py-10 md:py-0">
            <MapPin size={18} strokeWidth={1} className="text-orea-gold" />
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-orea-dark text-caption tracking-[0.4em] uppercase font-semibold leading-none">
                Made to Order
              </span>
              <span className="text-orea-taupe text-micro tracking-[0.3em] uppercase font-light leading-none">
                Crafted with care.
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
