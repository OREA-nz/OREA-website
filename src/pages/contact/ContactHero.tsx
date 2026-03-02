import React from 'react';

const ContactHero: React.FC = () => {
  return (
    <section className="relative pt-section-lg pb-16 w-full flex items-center justify-center overflow-hidden bg-orea-cream">
      <div className="absolute inset-0 bg-gradient-to-b from-orea-linen/30 to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-container">
        <h1 className="font-serif text-h2 mb-8 tracking-widest font-bold text-orea-dark uppercase">
          Begin Your ORÉA Journey
        </h1>
        <p className="font-sans text-body-sm tracking-widest text-orea-taupe leading-relaxed mx-auto mb-4 font-normal uppercase">
          Whether you are beginning something bespoke or have a simple question,
          <br className="hidden md:block" /> we are here to help.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
