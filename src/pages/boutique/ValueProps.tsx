'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  content: React.ReactNode;
  modalSize?: 'xsmall' | 'small' | 'medium' | 'large';
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, subtitle, content, modalSize = 'small' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const heights: Record<string, string> = { xsmall: '400px', small: '500px', medium: '550px', large: '630px' };
  const modalHeight = heights[modalSize ?? 'small'];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex flex-col items-center justify-center p-4 md:p-6 bg-transparent border border-orea-sand/50 hover:bg-orea-sand/20 transition-all gap-3 group text-center ${subtitle ? '' : 'aspect-square'}`}
      >
        <span className="text-orea-champagne group-hover:text-orea-dark transition-colors">{icon}</span>
        <span className="text-micro font-bold uppercase tracking-widest text-orea-dark leading-tight">{title}</span>
        {subtitle && (
          <span className="text-micro italic text-orea-taupe font-light leading-relaxed">{subtitle}</span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4 bg-orea-dark/40 backdrop-blur-sm animate-in fade-in"
          onClick={handleOverlayClick}
        >
          <div
            ref={contentRef}
            className="bg-orea-cream w-full rounded-t-lg md:rounded-sm relative shadow-2xl overflow-y-auto no-scrollbar flex flex-col"
            style={{ width: '600px', maxWidth: '100%', height: modalHeight, maxHeight: '90vh' }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 md:top-5 md:right-5 w-10 h-10 flex items-center justify-center rounded-full text-orea-champagne hover:text-orea-dark hover:bg-orea-sand/30 transition-all duration-200"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex flex-col flex-1 p-8 md:p-12">
              <div className="mb-6 flex justify-center text-orea-mocha scale-125 md:scale-150">{icon}</div>
              <h4 className="text-h4 md:text-h3 font-light mb-6 text-center font-serif tracking-tight uppercase">{title}</h4>
              <div className="text-body-sm md:text-body text-orea-taupe font-light leading-relaxed text-left flex flex-col gap-4 flex-1">
                {content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ValueProps: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-8">
      <InfoCard
        title="Precious Metal"
        modalSize="small"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="12" cy="12" r="9" strokeWidth="0.8" />
            <circle cx="12" cy="12" r="4" strokeWidth="0.8" />
          </svg>
        }
        content={
          <div className="flex flex-col gap-4 flex-1">
            <p>At ORÉA, our pieces are made to last a lifetime - not to be discarded.</p>
            <p>We use only solid 14k or 18k gold and platinum, never plated, filled, or vermeil. Precious metals are inherently durable, repairable, and timeless - the ultimate expression of lasting value.</p>
            <p className="text-orea-taupe font-light mt-auto text-center">{'18K gold or platinum \u2014 priced the same.'}<br />{'Choose the metal you love \u2014 without compromise.'}</p>
          </div>
        }
      />
      <InfoCard
        title="Premium Diamond"
        modalSize="large"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L4.5 9L12 22L19.5 9L12 2Z" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 9H19.5" strokeWidth="0.8" />
            <path d="M8 9L12 2L16 9" strokeWidth="0.8" />
          </svg>
        }
        content={
          <div className="flex flex-col gap-4 flex-1">
            <p>ORÉA works exclusively with certified lab-grown diamonds, selected for exceptional brilliance, integrity, and traceable quality.</p>
            <p>All centre stones in our engagement rings, as well as any diamond of 1 carat and above, meet the following minimum standards:</p>
            <ul className="flex flex-col gap-2 border-l border-orea-sand pl-6 text-body-sm">
              <li><strong>Cut:</strong> Excellent / Ideal</li>
              <li><strong>Clarity:</strong> VS and above</li>
              <li><strong>Colour:</strong> D-F</li>
            </ul>
            <p className="text-orea-champagne text-body-sm">All diamonds over 1 carat are independently graded by the IGI, the global authority for lab-grown diamond certification.</p>
            <p className="text-orea-taupe font-light mt-auto text-center">{'Various diamond shapes \u2014 carat-based pricing only.'}<br />{'Pick the shape that speaks to your style.'}</p>
          </div>
        }
      />
      <InfoCard
        title="Free Shipping"
        modalSize="xsmall"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        }
        content={
          <div className="flex flex-col gap-4">
            <p>Free fully insured shipping on all New Zealand orders.</p>
            <p>Orders are dispatched securely with signature required on delivery. Alternatively, you may collect your piece in person from our Christchurch studio.</p>
            <p>For full details, view our Shipping & Delivery information <Link to="/shipping" className="underline underline-offset-4 hover:text-orea-dark transition-colors font-medium">here</Link>.</p>
          </div>
        }
      />
      <InfoCard
        title="sustainable practices"
        modalSize="medium"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0112 13.5a11.952 11.952 0 01-8.716 1.247M3.284 14.253A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
        }
        content={
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-bold text-orea-dark text-caption uppercase tracking-widest mb-2">Longevity</p>
              <p>We use the highest-quality materials to ensure your jewellery can be worn, loved, and passed on for years to come.</p>
            </div>
            <div>
              <p className="font-bold text-orea-dark text-caption uppercase tracking-widest mb-2">Lab-Grown Diamonds</p>
              <p>Physically, chemically, and visually identical to mined diamonds. This modern approach reduces environmental impact while creating enduring beauty.</p>
            </div>
            <div>
              <p className="font-bold text-orea-dark text-caption uppercase tracking-widest mb-2">Carbon Offset Commitment</p>
              <p>ORÉA plants one tree for every purchase through Trees for Survival, contributing to long-term restoration beyond each piece we create.</p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ValueProps;
