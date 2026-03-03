import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSettings {
  heading: string;
  subheading: string;
  button_label: string;
  button_link?: string;
  image: string;
}

const Hero: React.FC<{ settings: HeroSettings }> = ({ settings }) => {
  return (
    <section className="relative h-[90vh] sm:h-screen w-full flex items-end justify-center overflow-hidden bg-orea-linen pb-10 md:pb-14">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={settings.image} 
          alt="ORÉA Fine Jewellery" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-orea-dark/[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-orea-cream/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-container mx-auto flex flex-col gap-8 fade-in">
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-[clamp(1.1rem,2.8vw,2.25rem)] text-orea-dark font-light tracking-[0.35em] sm:tracking-[0.45em] uppercase">
            {settings.heading}
          </h1>
          
          <div className="w-12 h-px bg-orea-dark/20 my-6 md:my-8"></div>
          
          <p className="text-caption tracking-[0.4em] sm:tracking-[0.5em] uppercase text-orea-taupe font-medium opacity-90">
            {settings.subheading}
          </p>
        </div>
        
        <div className="pt-2">
          <Link to={settings.button_link || '/collection'} className="group relative inline-block overflow-hidden px-10 md:px-12 py-4 border border-orea-dark/30 text-orea-dark text-caption tracking-[0.4em] uppercase transition-all duration-700 hover:text-orea-cream hover:border-orea-dark">
            <span className="relative z-10 font-medium">{settings.button_label}</span>
            <div className="absolute inset-0 bg-orea-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-orea-dark/10"></div>
    </section>
  );
};

export default Hero;
