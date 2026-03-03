'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ShapeProps {
  name: string;
  description: string;
  image: string;
  technicalNote: string;
}

const shapes: ShapeProps[] = [
  { name: "Round", description: "The timeless classic. Known for maximum brilliance and enduring elegance. The round brilliant cut is engineered for total internal reflection.", technicalNote: "58 Facets • Ideal Brilliance", image: "" },
  { name: "Oval", description: "Softly elongated and luminous. A refined shape that flatters the hand with graceful sparkle, offering a larger surface area than rounds.", technicalNote: "Elongated Brilliance • 57 Facets", image: "" },
  { name: "Pear", description: "A distinctive teardrop silhouette. Romantic, modern, and beautifully expressive. It combines the brilliance of a round with the length of a marquise.", technicalNote: "Tapered Symmetry • Teardrop Cut", image: "" },
  { name: "Marquise", description: "An elongated form with dramatic presence. Designed to appear larger and lengthen the finger, featuring a unique boat-shaped profile.", technicalNote: "Maximum Spread • Pointed Crown", image: "" },
  { name: "Princess", description: "Clean, modern brilliance in a square shape. Bold lines with a contemporary edge, known for its sharp corners and geometric fire.", technicalNote: "Pyramidal Base • Square Profile", image: "" },
  { name: "Emerald", description: "Step-cut and architectural. Celebrated for its clarity, depth, and quiet sophistication, creating a hall-of-mirrors effect.", technicalNote: "Step Cut • Parallel Facets", image: "" },
  { name: "Radiant", description: "Brilliant and dynamic. A perfect balance of sharp structure and vibrant fire, featuring cropped corners and a crushed-ice look.", technicalNote: "Hybrid Cut • Cropped Corners", image: "" },
  { name: "Asscher", description: "Geometric and vintage-inspired. Known for its square step-cut and timeless symmetry, reminiscent of Art Deco architecture.", technicalNote: "Square Step Cut • High Crown", image: "" },
  { name: "Cushion", description: "Soft corners with a classic glow. A romantic shape blending tradition and brilliance, often referred to as a pillow cut.", technicalNote: "Rounded Square • Antique Appeal", image: "" },
  { name: "Heart", description: "A rare symbol of devotion. Playful, sentimental, and unmistakably personal, requiring expert craftsmanship for perfect symmetry.", technicalNote: "Symmetrical Cleft • Brilliant Facets", image: "" }
];

const BASE_URL = 'https://unbridaled-prod.s3.amazonaws.com/das/static/images/shape_icons';

const SHAPE_SVG_MAP: Record<string, string> = {
  Round: `${BASE_URL}/shape-round.svg`,
  Oval: `${BASE_URL}/shape-oval.svg`,
  Pear: `${BASE_URL}/shape-pear.svg`,
  Marquise: `${BASE_URL}/shape-marquise.svg`,
  Princess: `${BASE_URL}/shape-princess.svg`,
  Emerald: `${BASE_URL}/shape-emerald.svg`,
  Radiant: `${BASE_URL}/shape-radiant.svg`,
  Asscher: `${BASE_URL}/shape-asscher.svg`,
  Cushion: `${BASE_URL}/shape-cushion.svg`,
  Heart: `${BASE_URL}/shape-heart.svg`,
};

const ShapeIcon = ({ name }: { name: string }) => {
  const src = SHAPE_SVG_MAP[name];
  if (!src) return null;
  return (
    <div style={{ width: 66, height: 66, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
      <img
        src={src}
        alt={name}
        style={{ width: 66, height: 66, objectFit: 'contain', padding: 0, display: 'block' }}
      />
    </div>
  );
};

export const DiamondShapes: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      updateScrollState();
      el.addEventListener('scroll', updateScrollState, { passive: true });
      return () => el.removeEventListener('scroll', updateScrollState);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const closeModal = () => setSelectedIndex(null);

  return (
    <section className="py-section relative overflow-hidden">
      <div className="max-w-content mx-auto flex flex-col items-center mb-section-sm text-center gap-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 md:text-h1 font-serif text-orea-dark leading-tight">Diamond Shapes</h2>
        <p className="text-orea-taupe font-light text-body-lg max-w-xl leading-relaxed">
          Each silhouette offers a unique presence. <br />
          Select a shape to explore its character and brilliance.
        </p>
      </div>

      <div className="relative px-4 sm:px-8 lg:px-16">
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-orea-cream/90 backdrop-blur-sm border border-orea-linen text-orea-dark rounded-full transition-opacity duration-300 hover:bg-orea-cream shadow-sm ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-orea-cream/90 backdrop-blur-sm border border-orea-linen text-orea-dark rounded-full transition-opacity duration-300 hover:bg-orea-cream shadow-sm ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 gap-px bg-[#FFFFFF] border-y border-orea-linen"
        >
          {shapes.map((s, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[45vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] snap-start bg-orea-cream transition-all duration-700 cursor-pointer overflow-hidden hover:bg-orea-linen/30 group/item"
              onClick={() => setSelectedIndex(i)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(i)}
              role="button"
              tabIndex={0}
            >
              <div className="aspect-[4/5] relative flex flex-col items-center justify-center p-6 bg-[#FFFFFF] transition-colors duration-500 overflow-hidden">
                <div className="flex items-center justify-center w-full h-full">
                  <ShapeIcon name={s.name} />
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 z-20">
                  <h3 className="text-caption uppercase tracking-[0.45em] font-bold text-orea-dark">{s.name}</h3>
                  <div className="w-0 h-px bg-orea-dark transition-all duration-700 group-hover/item:w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-12 transition-all duration-500">
          <div 
            className="absolute inset-0 bg-orea-dark/40 backdrop-blur-md transition-opacity duration-500" 
            onClick={closeModal}
            onKeyDown={(e) => e.key === 'Escape' && closeModal()}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          ></div>
          
          <div className="relative bg-orea-cream w-full max-w-xl border border-orea-linen shadow-2xl overflow-hidden animate-reveal">
            <button 
              onClick={closeModal} 
              className="absolute top-6 right-6 text-orea-champagne hover:text-orea-dark transition-colors z-20"
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
            </button>
            
            <div className="p-6 sm:p-10 md:p-16 flex flex-col items-center text-center gap-6 sm:gap-10">
              <div className="flex flex-col gap-4">
                <span className="text-caption uppercase tracking-[0.45em] font-bold text-orea-taupe">Shape Character</span>
                <h4 className="text-h2 md:text-h1 font-serif text-orea-dark tracking-tight">{shapes[selectedIndex].name}</h4>
              </div>
              
              <div className="flex flex-col gap-8">
                <p className="text-orea-taupe font-light text-body-lg leading-relaxed max-w-md mx-auto">
                  {shapes[selectedIndex].description}
                </p>
                
                <div className="pt-10 border-t border-orea-linen w-full">
                  <div className="flex flex-col gap-3">
                    <span className="text-micro uppercase tracking-[0.4em] font-bold text-orea-taupe">Technical Standards</span>
                    <p className="text-body-sm text-orea-dark font-bold tracking-[0.2em] uppercase">
                      {shapes[selectedIndex].technicalNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={closeModal}
                  className="text-caption uppercase tracking-[0.45em] font-bold text-orea-dark border-b border-orea-dark pb-1 hover:text-orea-taupe hover:border-orea-taupe transition-all"
                >
                  Return to gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-section border-t border-orea-linen pt-section-sm text-center px-4 sm:px-6 lg:px-8">
        <Link to="/bespoke" className="inline-block px-6 sm:px-12 py-5 border border-orea-dark text-orea-dark text-micro sm:text-caption uppercase tracking-[0.3em] sm:tracking-[0.45em] font-bold hover:bg-orea-dark hover:text-orea-cream transition-all duration-700 text-center">
          Enquire about a bespoke shape
        </Link>
      </div>
    </section>
  );
};
