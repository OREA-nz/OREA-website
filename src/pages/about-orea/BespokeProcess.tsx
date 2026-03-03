import React from 'react';
import { Link } from 'react-router-dom';

export const BespokeProcess: React.FC = () => {
  return (
    <section className="max-w-content mx-auto py-section flex flex-col gap-section-sm">
      <div className="text-center flex flex-col gap-8">
        <h4 className="text-caption uppercase tracking-[0.45em] text-orea-taupe font-semibold">A More Personal Way to Choose</h4>
        <h2 className="text-body-lg md:text-h3 font-serif text-orea-dark leading-tight text-center">
          {'Choosing fine jewellery should feel considered, not transactional.'}
        </h2>
        <div className="flex flex-col gap-6 text-orea-taupe font-light text-body-lg leading-relaxed max-w-content mx-auto">
          <p>{'ORÉA offers a thoughtful experience from start to finish, with personalised guidance online or by appointment at our Christchurch studio.'}</p>
          <p className="text-body md:text-body-lg">{'For those seeking something personal, we offer both partial and fully bespoke services.'}</p>
        </div>
        <div className="pt-8">
          <Link 
            to="/bespoke" 
            className="inline-block px-12 py-5 bg-orea-dark text-orea-cream text-caption uppercase tracking-[0.45em] font-bold hover:bg-orea-taupe transition-all"
          >
            {'Discover Bespoke →'}
          </Link>
        </div>
      </div>
      
    </section>
  );
};
