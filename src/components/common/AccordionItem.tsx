'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-orea-linen last:border-0 group">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 text-left focus:outline-none"
      >
        <span className="font-serif text-h4 font-light tracking-wide text-orea-dark group-hover:text-orea-taupe transition-colors">
          {question}
        </span>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <Minus size={20} strokeWidth={1} className="text-orea-taupe" />
          ) : (
            <Plus size={20} strokeWidth={1} className="text-orea-taupe" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-body leading-relaxed text-orea-taupe font-light max-w-content whitespace-pre-wrap">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
