'use client';

import React, { useState, useRef } from 'react';

interface ContactCardsProps {
  onSelectType: (type: string) => void;
}

const slides = [
  {
    id: 'consultation',
    label: "Consultation",
    title: "Private Consultations",
    description: "By appointment, online or in person.",
    points: [
      "Engagement & custom design",
      "Personal diamond guidance"
    ],
    cta: "Request an Appointment"
  },
  {
    id: 'bespoke',
    label: "Bespoke",
    title: "Bespoke & Custom Jewellery",
    description: "Made-to-order lab-grown diamond pieces.",
    points: [
      "Individually crafted designs",
      "Sustainably sourced materials"
    ],
    cta: "Start a Bespoke Enquiry"
  },
  {
    id: 'order',
    label: "Support",
    title: "Order Support",
    description: "For existing ORÉA clients and aftercare.",
    points: [
      "Shipping & delivery tracking",
      "Jewellery care & maintenance"
    ],
    cta: "Contact Support"
  }
];

const ContactCards: React.FC<ContactCardsProps> = ({ onSelectType }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % slides.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + slides.length) % slides.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = slides.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleCTAClick = (id: string) => {
    const formValue = id === 'order' ? 'order' : id === 'bespoke' ? 'bespoke' : 'consultation';
    onSelectType(formValue);

    const targetSection = document.getElementById('enquiry-type-section');
    const formContainer = document.getElementById('enquiry-form');

    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });

      if (targetSection) {
        setTimeout(() => {
          targetSection.classList.add('is-highlighted');
          setTimeout(() => {
            targetSection.classList.remove('is-highlighted');
          }, 2000);
        }, 600);
      }
    }
  };

  return (
    <div className="py-12 relative flex flex-col items-center select-none w-full overflow-hidden">
      {/* ARIA Tablist Navigation */}
      <div
        role="tablist"
        aria-label="Contact pathways"
        className="mb-24 flex gap-12 md:gap-20 items-center border-b border-orea-linen pb-5"
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            ref={el => { tabRefs.current[idx] = el; }}
            role="tab"
            aria-selected={idx === activeIndex}
            aria-controls={`panel-${slide.id}`}
            id={`tab-${slide.id}`}
            tabIndex={idx === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`text-caption uppercase tracking-widest font-bold transition-colors duration-500 relative pb-2 outline-none group ${
              idx === activeIndex
                ? 'text-orea-dark'
                : 'text-orea-taupe/40 hover:text-orea-taupe/80'
            }`}
          >
            {slide.label}
            {idx === activeIndex && (
              <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-orea-champagne" />
            )}
            <span className="sr-only">{slide.title} category</span>
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-content h-[520px] flex items-center justify-center">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const isNext = (idx === (activeIndex + 1) % slides.length);
          const isPrev = (idx === (activeIndex - 1 + slides.length) % slides.length);

          let zIndex = 0;
          let opacity = 0;
          let transform = 'scale(0.8) translateY(60px)';

          if (isActive) {
            zIndex = 30;
            opacity = 1;
            transform = 'scale(1) translateY(0) translateX(0)';
          } else if (isNext) {
            zIndex = 20;
            opacity = 0.6;
            transform = 'scale(0.9) translateY(30px) translateX(120px)';
          } else if (isPrev) {
            zIndex = 10;
            opacity = 0.4;
            transform = 'scale(0.85) translateY(50px) translateX(-120px)';
          }

          return (
            <div
              key={slide.id}
              role="tabpanel"
              id={`panel-${slide.id}`}
              aria-labelledby={`tab-${slide.id}`}
              hidden={!isActive && !isNext && !isPrev}
              onClick={() => !isActive && setActiveIndex(idx)}
              className={`absolute w-full bg-[#FFFFFF] border transition-all duration-500 shadow-sm ${
                isActive
                ? 'border-orea-linen p-14 md:p-20'
                : 'border-orea-linen/50 p-12 md:p-16 cursor-pointer hover:border-orea-champagne/40'
              }`}
              style={{
                zIndex,
                opacity,
                transform,
                visibility: (isActive || isNext || isPrev) ? 'visible' : 'hidden'
              }}
            >
              <h3 className="font-serif text-h2 mb-8 font-light text-orea-dark tracking-wider leading-tight uppercase">
                {slide.title}
              </h3>
              <p className="text-body-sm uppercase tracking-widest mb-12 text-orea-taupe font-medium">
                {slide.description}
              </p>
              <ul className="flex flex-col gap-6 mb-16 inline-block text-left">
                {slide.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-caption uppercase tracking-widest text-orea-dark font-normal flex items-center">
                    <span className="w-4 h-px bg-orea-champagne/60 mr-6" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCTAClick(slide.id);
                  }}
                  className="text-caption uppercase tracking-widest font-bold border-b border-orea-linen pb-2 text-orea-taupe hover:text-orea-dark hover:border-orea-dark transition-all duration-700 ease-in-out"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactCards;
