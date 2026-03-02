'use client';

import React from 'react';
import { Category } from './types';

interface CollectionHeaderProps {
  currentCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const COLLECTION_LINKS: Category[] = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants'];

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ currentCategory, onCategoryChange }) => {
  return (
    <header className="pt-16 pb-8 md:pt-section md:pb-12 px-6 md:px-12 max-w-wide mx-auto w-full">
      <div className="flex flex-col items-center">
        <nav className="w-full flex justify-center py-4">
          <ul className="flex flex-wrap justify-center gap-x-14 gap-y-6 md:gap-x-20">
            {COLLECTION_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => onCategoryChange(link)}
                  className={`group relative text-caption uppercase tracking-[0.25em] transition-colors duration-500 pb-2 font-bold
                    ${currentCategory === link ? 'text-orea-dark' : 'text-orea-dark/80 hover:text-orea-dark'}
                  `}
                >
                  {link}
                  <span className={`absolute bottom-0 left-0 w-full h-px bg-orea-champagne transition-transform duration-500 origin-left
                    ${currentCategory === link ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CollectionHeader;
