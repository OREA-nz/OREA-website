import React from 'react';

export const LabGrownIntro: React.FC = () => {
  return (
    <section className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-section">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-orea-linen hidden lg:block -z-10"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        <div className="lg:col-span-6 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-display font-serif text-orea-dark leading-[1.05] tracking-tight">
              What Is a <br />
              <span className="text-orea-taupe">Lab-Grown</span> <br />
              Diamond
            </h2>
          </div>
          
          <div className="max-w-md">
            <h4 className="text-caption uppercase tracking-[0.45em] text-orea-dark font-bold mb-10 border-l-2 border-orea-dark pl-6 py-1 leading-relaxed">
              Real diamonds. <br />
              Modern origins.
            </h4>
            <p className="text-orea-taupe font-light text-body-lg leading-relaxed">
              {'A lab-grown diamond is chemically, physically, and optically identical to an earth-mined diamond - with the same brilliance, hardness, and fire.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-32 flex flex-col gap-16">
          <div className="flex flex-col gap-8 max-w-lg">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-orea-dark"></div>
              <span className="text-caption uppercase tracking-[0.45em] text-orea-dark font-bold">The Distinction</span>
            </div>
            
            <p className="text-orea-taupe font-light text-body-lg leading-loose">
              {'The only difference is creation — grown in a controlled environment rather than extracted through mining. A modern approach to nature\'s most enduring material.'}
            </p>
          </div>

          <div className="relative group cursor-default">
            <div className="absolute -inset-4 border border-orea-linen opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="flex flex-col gap-2">
              <p className="text-orea-dark font-serif text-h3 tracking-wide leading-relaxed">
                Same diamond. <br />
                Same beauty. <br />
                A more intentional origin.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <div className="w-4 h-4 border border-orea-dark rotate-45 flex items-center justify-center">
                <div className="w-1 h-1 bg-orea-dark"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-section border-t border-orea-linen"></div>
    </section>
  );
};
