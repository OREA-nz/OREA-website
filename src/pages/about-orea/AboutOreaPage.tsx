import React from 'react';
import { Hero } from './Hero';
import { OriginText } from './OriginText';
import { OreaStandards } from './OreaStandards';
import { BespokeProcess } from './BespokeProcess';
import { SustainabilityBadge } from './SustainabilityBadge';
import { LocationContact } from './LocationContact';

const AboutOreaPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Hero />
      
      <div className="flex flex-col gap-section-lg pb-section-lg max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <OriginText />
        <OreaStandards />
        <BespokeProcess />
        <SustainabilityBadge />
        <LocationContact />
      </div>
    </main>
  );
};

export default AboutOreaPage;
