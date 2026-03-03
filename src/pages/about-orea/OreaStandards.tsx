import React from 'react';

export const OreaStandards: React.FC = () => {
  return (
    <section className="flex flex-col gap-section-lg">
      <div className="max-w-content mx-auto text-center flex flex-col gap-4">
        <h2 className="text-h1 font-serif text-orea-dark leading-relaxed tracking-[0.06em]">
          The ORÉA Standards
        </h2>
        <p className="text-body-lg font-serif text-orea-taupe">
          {'ORÉA works within a considered framework'}
        </p>
      </div>

      <div className="max-w-container mx-auto flex flex-col gap-section">
        {/* Pillar 1: Metals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="w-12 h-12 border border-orea-champagne rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-orea-dark">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
            </div>
            <h3 className="text-h3 font-serif text-orea-dark tracking-tight">Solid Precious Metals</h3>
            <div className="flex flex-col gap-6 text-orea-taupe leading-relaxed font-light text-body-lg">
              <p>
                {'We work only in solid 14k or 18k gold and platinum — never plated, filled, or vermeil.'}
              </p>
              <p className="text-orea-taupe leading-relaxed font-light text-body-lg">
                Precious metals are inherently durable, repairable, and made to last.
              </p>
            </div>
          </div>
          
          <div className="aspect-square overflow-hidden">
            <img src="/images/about-metals.jpg" alt="Solid Precious Metals" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Pillar 2: Diamonds */}
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="order-2 md:order-1 aspect-square overflow-hidden">
              <img src="/images/about-diamonds.jpg" alt="Certified Lab-Grown Diamonds" className="w-full h-full object-cover object-center" />
            </div>
            
            <div className="order-1 md:order-2 flex flex-col gap-8">
              <div className="w-12 h-12 border border-orea-champagne rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-orea-dark">
                  <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                </svg>
              </div>
              <h3 className="text-h3 font-serif text-orea-dark tracking-tight">Certified Premium Diamonds</h3>
              <p className="text-orea-taupe leading-relaxed font-light text-body-lg">
                {'ORÉA works exclusively with certified lab-grown diamonds.'}
              </p>
              <p className="text-orea-taupe leading-relaxed font-light text-body-lg">
                {'Selected for exceptional brilliance and traceable quality.'}
              </p>
              <p className="text-orea-taupe leading-relaxed font-light text-body-lg">
                For centre stones over 1 carat, we offer only diamonds that meet our highest minimum standards, independently graded by IGI.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-orea-linen p-8 md:p-12 border border-orea-champagne/20">
            {[
              { label: "Cut", value: "Excellent / Ideal", sub: "maximized brilliance" },
              { label: "Clarity", value: "VS and above", sub: "Eye-clean" },
              { label: "Colour", value: "D — F", sub: "Colourless" }
            ].map((spec, i) => (
              <div key={i} className="text-center flex flex-col gap-3">
                <span className="text-caption uppercase tracking-[0.4em] text-orea-taupe font-bold">{spec.label}</span>
                <div className="text-h3 font-serif text-orea-dark">{spec.value}</div>
                <div className="text-caption uppercase tracking-widest text-orea-taupe font-medium">{spec.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 3 & 4: Experience & Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-orea-champagne/30 border border-orea-champagne/20">
          <div className="bg-orea-cream p-8 md:p-16 flex flex-col gap-10 group transition-all duration-700 hover:bg-orea-linen/20">
            <div className="w-12 h-12 border border-orea-linen rounded-full flex items-center justify-center group-hover:border-orea-dark transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-orea-dark">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-h3 font-serif text-orea-dark tracking-tight">Guided, Never Rushed</h3>
              <p className="text-orea-taupe font-light text-body leading-relaxed">
                {'We offer a calm, consultation-led experience — never pressure, never urgency. Whether you are choosing a signature piece or designing bespoke, you will be guided with clarity and care.'}
              </p>
            </div>
          </div>

          <div className="bg-orea-cream p-8 md:p-16 flex flex-col gap-10 group transition-all duration-700 hover:bg-orea-linen/20">
            <div className="w-12 h-12 border border-orea-linen rounded-full flex items-center justify-center group-hover:border-orea-dark transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-orea-dark">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-h3 font-serif text-orea-dark tracking-tight">Designed to Last</h3>
              <p className="text-orea-taupe font-light text-body leading-relaxed">
                {'ORÉA jewellery is crafted for everyday wear and long-term keeping. Engagement and wedding rings include a Lifetime Manufacturing Warranty, supporting longevity well beyond the moment of purchase.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
