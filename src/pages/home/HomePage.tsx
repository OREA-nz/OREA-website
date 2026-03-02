'use client';

import React from 'react';
import Hero from './Hero';
import Collections from './Collections';
import BrandValues from './BrandValues';
import FeaturedProducts from './FeaturedProducts';

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] pb-[120px] -mb-[120px]">
      <main>
        <Hero 
          settings={{
            heading: "Diamonds. Grown. Not Mined.",
            subheading: "Exceptional pieces, made to keep.",
            button_label: "Explore the Collections",
            image: "/images/hero.jpg"
          }}
        />

        <Collections />

        <FeaturedProducts />

        <BrandValues />
      </main>
    </div>
  );
};

export default HomePage;
