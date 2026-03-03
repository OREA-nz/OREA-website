import React from 'react';
import { Link } from 'react-router-dom';

export const LocationContact: React.FC = () => {
  return (
    <section className="text-center py-section flex flex-col gap-section-sm border-t border-orea-linen/30">
      <div className="flex flex-col gap-8 max-w-content mx-auto">
        <h4 className="font-serif text-caption uppercase tracking-[0.45em] text-orea-taupe font-semibold">Begin the Conversation</h4>
        <h2 className="text-h2 md:text-h1 font-serif text-orea-dark leading-relaxed">
          {'Whether you have a clear vision or are just beginning to explore,'}{' '}
          <br className="hidden md:block" />
          {'we are here to guide you.'}
        </h2>
      </div>

      <div className="flex justify-center pt-8">
        <Link 
          to="/contact" 
          className="px-16 md:px-20 py-5 md:py-6 border border-orea-dark text-orea-dark text-body-sm uppercase tracking-[0.5em] font-bold hover:bg-orea-dark hover:text-orea-cream transition-all duration-500"
        >
          {'Contact ORÉA →'}
        </Link>
      </div>
    </section>
  );
};
