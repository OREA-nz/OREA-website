'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PencilRuler, Diamond, Package } from 'lucide-react';

interface StepData {
  icon: React.ElementType;
  title: string;
  body: React.ReactNode;
  timeEstimate: string;
}

const steps: StepData[] = [
  {
    icon: Users,
    title: "CONSULTATION",
    timeEstimate: "Approx. 30-60 minutes",
    body: (
      <p>Your journey begins with a one-on-one consultation, either online or in person at our studio. This relaxed session allows us to get to know you and your partner's style, understand your vision, and determine the right path forward.</p>
    )
  },
  {
    icon: PencilRuler,
    title: "DESIGN",
    timeEstimate: "Approx. 1-4 weeks",
    body: (
      <div className="flex flex-col gap-4">
        <p>This is where ideas take form. We translate your vision into sketches and photorealistic 3D renders, refining proportions and settings with care.</p>
        <p>Design is a collaborative stage. We'll share ideas, invite your feedback, and fine-tune every element until the design feels resolved and considered.</p>
      </div>
    )
  },
  {
    icon: Diamond,
    title: "SELECTION",
    timeEstimate: "Approx. 3-10 days",
    body: (
      <div className="flex flex-col gap-4">
        <p>Once the design is confirmed, we source a curated selection of lab-grown diamonds that align with your budget and aesthetic preferences.</p>
        <p>You'll be guided through each option with complete transparency regarding cut, colour, clarity, and certification.</p>
      </div>
    )
  },
  {
    icon: Package,
    title: "CRAFT & COMPLETION",
    timeEstimate: "Approx. 2-8 weeks",
    body: (
      <div className="flex flex-col gap-4">
        <p>Your piece is crafted with precision and attention to longevity. Once completed, your jewellery is carefully finished, inspected, and prepared for collection or secure delivery.</p>
      </div>
    )
  }
];

const BespokePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative px-6 md:px-12 py-section md:py-section-xl text-center overflow-hidden border-b border-orea-champagne/30">
        <div className="relative z-10 max-w-wide mx-auto">
          <h2 className="text-orea-taupe text-caption uppercase tracking-widest mb-8 font-medium">Collaborative, Considered, and not rushed</h2>
          <h1 className="text-h3 md:text-h2 font-serif text-orea-dark mb-10 uppercase tracking-[0.06em] font-light leading-relaxed">
            Bespoke Jewellery, Grown for You
          </h1>
          <div className="text-orea-taupe text-body-lg font-light tracking-wider max-w-xl mx-auto flex flex-col gap-3">
            <p>At the heart of every product lies a unique story.</p>
            <p>Each item enhances your everyday life and sparks joy.</p>
          </div>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT: PARTIAL VS FULLY BESPOKE */}
      <section className="flex flex-col lg:flex-row min-h-[95vh]">
        {/* LEFT COLUMN: Partial Bespoke */}
        <div className="relative flex-1 group overflow-hidden min-h-[650px] aspect-[3/4] lg:aspect-auto border-r border-orea-cream/20 bg-orea-linen">
          <img src="/images/bespoke-partial.jpg" alt="Partial Bespoke" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-orea-dark/20 transition-colors duration-700 group-hover:bg-orea-dark/30" />

          <div className="relative z-10 h-full p-10 md:p-16 lg:p-28 flex flex-col justify-center text-orea-cream">
            <h3 className="text-h1 font-serif mb-12 uppercase tracking-widest font-light">Partial Bespoke</h3>
            <div className="flex flex-col gap-6 max-w-lg text-body font-light tracking-wide leading-relaxed">
              <p>Refine an existing ORÉA design.</p>
              <p>Select your stone, metal, and setting within ORÉA's design framework.</p>
              <p className="font-medium pt-4 text-orea-gold uppercase tracking-widest text-body-sm">Adjustable Elements</p>
              <ul className="flex flex-col gap-3 pl-2">
                <li className="flex items-center gap-4 text-body"><div className="w-1 h-1 rounded-full bg-orea-champagne" /> Diamond size or shape</li>
                <li className="flex items-center gap-4 text-body"><div className="w-1 h-1 rounded-full bg-orea-champagne" /> Metal type or color</li>
                <li className="flex items-center gap-4 text-body"><div className="w-1 h-1 rounded-full bg-orea-champagne" /> Band width or finish</li>
              </ul>
              <p className="pt-12 border-t border-orea-cream/20 text-caption uppercase tracking-widest opacity-90">
                Streamlined process. Shorter timeframes.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Fully Bespoke */}
        <div className="relative flex-1 group overflow-hidden min-h-[650px] aspect-[3/4] lg:aspect-auto bg-orea-champagne">
          <img src="/images/bespoke-full.jpg" alt="Fully Bespoke" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-orea-dark/30 transition-colors duration-700 group-hover:bg-orea-dark/40" />

          <div className="relative z-10 h-full p-10 md:p-16 lg:p-28 flex flex-col justify-center text-orea-cream">
            <h3 className="text-h1 font-serif mb-12 uppercase tracking-widest font-light">Fully Bespoke</h3>
            <div className="flex flex-col gap-6 max-w-lg text-body font-light tracking-wide leading-relaxed">
              <p>Designed entirely from scratch.</p>
              <p>A guided, consultation-led process for creating a one-of-a-kind piece.</p>
              <p className="font-medium pt-4 text-orea-linen uppercase tracking-widest text-body-sm">Ideal For</p>
              <ul className="flex flex-col gap-3 pl-2">
                <li className="flex items-center gap-4 text-body"><div className="w-1 h-1 rounded-full bg-orea-linen" /> Engagement or milestone pieces</li>
                <li className="flex items-center gap-4 text-body"><div className="w-1 h-1 rounded-full bg-orea-linen" /> Unique or complex designs</li>
                <li className="flex items-center gap-4 text-body"><div className="w-1 h-1 rounded-full bg-orea-linen" /> A highly personal creation journey</li>
              </ul>
              <p className="pt-12 border-t border-orea-cream/20 text-caption uppercase tracking-widest opacity-90">
                Dedicated diamond sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <section className="bg-orea-cream py-section-lg md:py-section-xl px-6 md:px-12">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-section-lg">
            <h2 className="text-orea-taupe text-caption uppercase tracking-widest mb-6 font-medium">The Bespoke Process</h2>
            <h3 className="text-h1 font-serif text-orea-dark uppercase tracking-wider font-light">How it works</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-orea-linen border border-orea-linen">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
                className={`relative group flex flex-col items-center text-center p-14 md:p-20 transition-all duration-700 bg-orea-cream hover:bg-orea-cream/80 ${activeStep === index ? 'bg-orea-cream/80' : ''}`}
              >
                <div className={`mb-12 p-6 rounded-full border border-orea-champagne/40 transition-all duration-700 ${activeStep === index ? 'bg-orea-dark text-orea-cream border-orea-dark' : 'text-orea-dark bg-transparent'}`}>
                  <step.icon size={22} strokeWidth={1} />
                </div>
                <h4 className={`text-caption uppercase tracking-widest font-bold text-orea-dark mb-6 transition-colors ${activeStep === index ? 'text-orea-taupe' : ''}`}>
                  {step.title}
                </h4>
                <div className={`w-8 h-px bg-orea-champagne mb-6 transition-all duration-700 ${activeStep === index ? 'w-16' : 'group-hover:w-16'}`} />
                <span className="text-micro uppercase tracking-widest text-orea-earth opacity-60 font-medium">
                  {activeStep === index ? 'Close' : 'Details'}
                </span>

                {activeStep === index && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-orea-cream/80 rotate-45 border-r border-b border-orea-linen z-10" />
                )}
              </button>
            ))}
          </div>

          <div className={`mt-20 overflow-hidden transition-all duration-700 ease-in-out ${activeStep !== null ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-orea-cream p-10 md:p-20 border border-orea-linen">
              <div className="max-w-container mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
                <div className="flex-1 flex flex-col gap-8 text-orea-dark leading-relaxed text-body font-light tracking-wide">
                  {activeStep !== null && (
                    <div className="font-sans">
                      {steps[activeStep].body}
                    </div>
                  )}
                </div>
                <div className="md:w-72 pt-4 border-t md:border-t-0 md:border-l border-orea-champagne/40 md:pl-16">
                  <span className="text-micro uppercase tracking-widest font-bold text-orea-taupe block mb-4 opacity-80">Timeline</span>
                  <p className="text-body-sm uppercase tracking-widest text-orea-dark font-medium leading-loose">
                    {activeStep !== null && steps[activeStep].timeEstimate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-section-xl px-6 md:px-12 bg-orea-cream text-center border-t border-orea-champagne/30">
        <div className="max-w-content mx-auto">
          <h3 className="text-body-lg md:text-h3 font-serif text-orea-dark mb-10 uppercase tracking-wider font-light leading-tight text-center">
            The Journey Begins With A Conversation.
          </h3>
          <div className="text-orea-taupe mb-16 font-light text-body leading-relaxed max-w-2xl mx-auto tracking-wide text-center flex flex-col gap-1">
            <p>Whether you arrive with a fully formed vision or just the earliest spark of an idea,</p>
            <p>we are here to guide you through the art of creation with care and expertise.</p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="group relative px-16 py-7 bg-orea-dark text-orea-cream text-caption uppercase tracking-widest font-bold hover:bg-orea-taupe transition-all duration-500 shadow-sm"
            >
              <span className="relative z-10">Book a consultation</span>
              <div className="absolute inset-0 bg-orea-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BespokePage;
