'use client';

import React, { useState } from 'react';
import AccordionItem from '../../components/common/AccordionItem';
import { GENERAL_FAQ } from './constants';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="flex-grow">
      {/* Page Hero Section */}
      <section className="pt-section pb-16 px-6 lg:px-12 text-center">
        <div className="max-w-container mx-auto">
          <h1 className="font-serif text-h1 font-light tracking-wide mb-8 text-orea-dark">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-px bg-orea-gold mx-auto mb-12" />
        </div>
      </section>

      {/* Content Accordion Section */}
      <section className="px-6 lg:px-12 pb-section-xl">
        <div className="max-w-container mx-auto">
          <div className="border-t border-orea-linen">
            {GENERAL_FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer as string}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
