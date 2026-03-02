import React from 'react';

export const SustainabilityBadge: React.FC = () => {
  return (
    <section className="py-section bg-orea-cream border-y border-orea-linen">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-56 h-56 border border-orea-dark rounded-full flex flex-col items-center justify-center p-8 text-center bg-orea-cream shadow-sm transition-transform duration-700 hover:scale-105">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 text-orea-dark">
                    <path d="M12 2L19 21H5L12 2Z" />
                    <path d="M12 16V21" />
                 </svg>
                 <span className="text-body-sm uppercase tracking-[0.35em] font-bold leading-tight text-orea-dark">
                  One Tree <br /> Per Purchase
                 </span>
              </div>
              <div className="absolute -inset-4 border border-orea-champagne rounded-full opacity-30 scale-110"></div>
            </div>

          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-6">
              <h4 className="font-serif text-caption uppercase tracking-[0.45em] text-orea-taupe font-semibold">Thoughtful Practices</h4>
              <p className="text-body-lg leading-relaxed font-serif text-orea-dark">
                {'ORÉA works exclusively with lab-grown diamonds as part of a more considered approach to fine jewellery.'}
              </p>
            </div>
            
            <div className="max-w-xl">
              <p className="text-body-lg leading-relaxed font-serif text-orea-dark">
                For every purchase, we plant one tree through Trees for Survival, supporting long-term restoration across Aotearoa.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
