import React from 'react';

export const DiamondComparison: React.FC = () => {
  const specs = [
    { label: "Origin", lab: "Grown in a lab (HPHT or CVD)", mined: "Formed in the earth" },
    { label: "Chemical Composition", lab: "Pure carbon", mined: "Pure carbon" },
    { label: "Crystal Structure", lab: "Cubic", mined: "Cubic" },
    { label: "Hardness (Mohs)", lab: "10 / 10", mined: "10 / 10" },
    { label: "Refractive Index", lab: "2.42", mined: "2.42" },
    { label: "Dispersion (Fire)", lab: "0.044", mined: "0.044" },
    { label: "Appearance", lab: "Same sparkle and brilliance", mined: "Same sparkle and brilliance" },
    { label: "Visual Difference", lab: "Indistinguishable to the naked eye", mined: "Indistinguishable to the naked eye" },
    { label: "Grading", lab: "Certified by IGI or equivalent", mined: "Certified by GIA or equivalent" },
    { label: "Price", lab: "More accessible for comparable quality", mined: "Higher cost due to rarity and mining costs" },
    { label: "Environmental Impact", lab: "Lower land disruption", mined: "Mining impact varies" },
    { label: "ORÉA Offering", lab: "Always lab-grown", mined: "Not offered" }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-container mx-auto text-center mb-section-sm">
        <h2 className="text-h3 md:text-h2 font-serif text-orea-dark leading-relaxed tracking-wider">
          <span className="underline decoration-orea-champagne/60 decoration-[0.5px] underline-offset-[10px]">Lab-Grown</span> vs <span className="underline decoration-orea-champagne/60 decoration-[0.5px] underline-offset-[10px]">Earth-Mined</span> Diamonds
        </h2>
      </div>

      <div className="max-w-container mx-auto">
        <div className="bg-orea-dark text-orea-cream rounded-sm overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{backgroundImage: 'radial-gradient(circle, #F9F6F1 0.5px, transparent 0.5px)', backgroundSize: '40px 40px'}}></div>
          
          {/* Desktop table */}
          <div className="relative z-10 hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-orea-cream/10">
                  <th className="py-10 px-6 lg:px-10 text-caption uppercase tracking-[0.45em] font-bold text-orea-gold w-1/4">Property</th>
                  <th className="py-10 px-6 lg:px-10 text-caption uppercase tracking-[0.45em] font-bold text-orea-cream w-[37.5%]">Lab-Grown</th>
                  <th className="py-10 px-6 lg:px-10 text-caption uppercase tracking-[0.45em] font-bold text-orea-cream w-[37.5%]">Earth-Mined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orea-cream/5">
                {specs.map((s, i) => (
                  <tr key={i} className="transition-colors hover:bg-orea-cream/[0.02]">
                    <td className="py-8 px-6 lg:px-10 text-caption font-bold text-orea-champagne uppercase tracking-[0.4em]">{s.label}</td>
                    <td className="py-8 px-6 lg:px-10 text-body font-serif text-orea-cream">
                      {s.lab}
                    </td>
                    <td className="py-8 px-6 lg:px-10 text-body font-serif text-orea-cream">
                      {s.mined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout */}
          <div className="relative z-10 md:hidden flex flex-col divide-y divide-orea-cream/5">
            {specs.map((s, i) => (
              <div key={i} className="py-6 px-6">
                <h4 className="text-micro font-bold text-orea-champagne uppercase tracking-[0.4em] mb-4">{s.label}</h4>
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-micro uppercase tracking-[0.3em] font-bold text-orea-gold block mb-1">Lab-Grown</span>
                    <span className="text-body-sm font-serif text-orea-cream">{s.lab}</span>
                  </div>
                  <div>
                    <span className="text-micro uppercase tracking-[0.3em] font-bold text-orea-cream/60 block mb-1">Earth-Mined</span>
                    <span className="text-body-sm font-serif text-orea-cream">{s.mined}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-12 border-t border-orea-cream/10 bg-orea-cream/[0.01] text-center flex flex-col gap-4">
            <p className="text-caption text-orea-taupe uppercase tracking-[0.4em]">
              This is a high-level comparison for general guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
