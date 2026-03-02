'use client';

import React, { useRef, useCallback } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  const sizes = [
    { au: 'F', us: '3', eu: '44', mm: '14.1' },
    { au: 'G', us: '3.5', eu: '45', mm: '14.5' },
    { au: 'H', us: '4', eu: '46.5', mm: '14.9' },
    { au: 'I', us: '4.5', eu: '48', mm: '15.3' },
    { au: 'J', us: '5', eu: '49', mm: '15.7' },
    { au: 'K', us: '5.5', eu: '50', mm: '16.1' },
    { au: 'L', us: '6', eu: '51.5', mm: '16.5' },
    { au: 'M', us: '6.5', eu: '53', mm: '16.9' },
    { au: 'N', us: '7', eu: '54', mm: '17.3' },
    { au: 'O', us: '7.5', eu: '55.5', mm: '17.7' },
    { au: 'P', us: '8', eu: '56.5', mm: '18.1' },
    { au: 'Q', us: '8.5', eu: '58', mm: '18.5' },
    { au: 'R', us: '9', eu: '59.5', mm: '19.0' },
    { au: 'S', us: '9.5', eu: '61', mm: '19.4' },
    { au: 'T', us: '10', eu: '62', mm: '19.8' },
    { au: 'U', us: '10.5', eu: '63', mm: '20.2' },
    { au: 'V', us: '11', eu: '64.5', mm: '20.6' },
    { au: 'W', us: '11.5', eu: '66', mm: '21.0' },
    { au: 'X', us: '12', eu: '67.5', mm: '21.4' },
    { au: 'Y', us: '12.25', eu: '68', mm: '21.6' },
    { au: 'Z', us: '12.5', eu: '69', mm: '21.8' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-orea-dark/40 backdrop-blur-md animate-in fade-in duration-500" onClick={handleOverlayClick}>
      <div ref={contentRef} className="bg-orea-cream w-full max-w-2xl p-6 sm:p-8 md:p-16 rounded-sm shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-10 sm:right-10 text-orea-champagne hover:text-orea-dark transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <h3 className="text-h2 font-light font-serif italic text-orea-dark">Size Guide</h3>
            <p className="text-micro font-bold uppercase tracking-widest text-orea-champagne">Finding Your Perfect Fit</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-orea-latte pb-4 gap-2">
              <h4 className="font-serif text-caption font-bold uppercase tracking-wider text-orea-dark">International Conversion</h4>
              <span className="text-caption text-orea-champagne italic font-serif">AU / NZ / UK Standards (F-Z)</span>
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-left text-caption tracking-widest">
                <thead>
                  <tr className="text-[#4A3F35] border-b border-orea-sand/50">
                    <th className="py-6 font-bold uppercase text-micro tracking-widest">AU / NZ / UK</th>
                    <th className="py-6 font-bold uppercase text-micro tracking-widest">US / CAN</th>
                    <th className="py-6 font-bold uppercase text-micro tracking-widest">EU</th>
                    <th className="py-6 font-bold uppercase text-micro tracking-widest text-right">INNER DIAMETER</th>
                  </tr>
                </thead>
                <tbody className="text-orea-mocha">
                  {sizes.map((s, idx) => (
                    <tr key={idx} className="border-b border-orea-sand/20 hover:bg-orea-sand/10 transition-colors group">
                      <td className="py-4 font-medium text-orea-dark">{s.au}</td>
                      <td className="py-4 font-light text-[#4A3F35]">{s.us}</td>
                      <td className="py-4 font-light text-[#4A3F35]">{s.eu}</td>
                      <td className="py-4 font-light text-right text-[#4A3F35] italic font-serif">{s.mm}mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-12 border-t border-orea-sand/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-body-sm text-orea-taupe font-light leading-relaxed">
              <div className="flex flex-col gap-3">
                <p className="font-bold text-orea-dark uppercase tracking-wider text-caption">Temperature Matters</p>
                <p>Ensure you measure your finger at room temperature. Fingers tend to shrink in the cold and swell in the heat.</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-orea-dark uppercase tracking-wider text-caption">Band Width</p>
                <p>Wider bands fit more tightly than narrow ones. For wider bands, consider selecting a half size larger.</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-orea-dark uppercase tracking-wider text-caption">Between Sizes</p>
                <p>If your measurement falls between two sizes, we recommend selecting the larger size for a comfortable fit.</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-orea-dark uppercase tracking-wider text-caption">Expert Advice</p>
                <p>If in doubt, get in touch with us, or request a complimentary ORÉA ring sizer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
