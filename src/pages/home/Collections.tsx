import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Collections: React.FC = () => {
  const collectionData = [
    {
      title: 'RINGS',
      description: 'For the lasting moments.',
      link: '/collection?category=Rings',
      image: '/images/editorial-rings.jpg'
    },
    {
      title: 'FINE JEWELLERY',
      description: 'For every day.',
      link: '/collection?category=Necklaces',
      image: '/images/editorial-necklaces.jpg'
    },
    {
      title: 'BESPOKE',
      description: 'A private consultation experience.',
      link: '/bespoke',
      image: '/images/editorial-bespoke.jpg'
    }
  ];

  return (
    <section id="collections" className="pt-section md:pt-section-xl pb-section-sm md:pb-section bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-section md:gap-section-xl">
        {collectionData.map((item, index) => (
          <div 
            key={item.title} 
            className={`flex flex-col md:flex-row gap-8 md:gap-24 items-center md:items-end ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image Container */}
            <div className="w-full md:w-3/5 lg:w-[55%] group">
              <Link 
                to={item.link} 
                className="relative block w-full aspect-[3/4] overflow-hidden bg-orea-cream shadow-sm"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover object-center grayscale-[5%] transition-transform duration-[3s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-orea-dark/0 group-hover:bg-orea-dark/[0.02] transition-colors duration-1000"></div>
              </Link>
            </div>

            {/* Content Area */}
            <div className="w-full md:w-2/5 lg:w-[45%] pb-4">
              
              {item.title === 'FINE JEWELLERY' ? (
                <div className="flex flex-col items-center md:items-end w-full gap-6 md:gap-10">
                  <div className="flex flex-col gap-4 text-center md:text-right">
                    <h3 className="font-serif text-h2 text-orea-dark font-light tracking-tight uppercase leading-none transition-colors duration-700 hover:text-orea-earth">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-orea-taupe font-medium tracking-[0.2em] uppercase leading-none mt-4">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-center md:justify-end w-full pt-2 md:pt-4">
                    <Link 
                      to={item.link} 
                      className="group/btn inline-flex items-center gap-6 text-caption tracking-[0.45em] uppercase text-orea-dark transition-all duration-500 hover:text-orea-earth"
                    >
                      <span className="font-semibold border-b border-orea-dark/10 pb-1 group-hover/btn:border-orea-earth">Explore</span>
                      <ArrowRight size={14} strokeWidth={1.5} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 md:gap-10 text-center md:text-left">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-h2 text-orea-dark font-light tracking-tight uppercase leading-none transition-colors duration-700 hover:text-orea-earth">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-orea-taupe font-medium tracking-[0.2em] uppercase max-w-xs md:max-w-sm leading-relaxed mx-auto md:mx-0">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link 
                      to={item.link} 
                      className="group/btn inline-flex items-center gap-6 text-caption tracking-[0.45em] uppercase text-orea-dark transition-all duration-500 hover:text-orea-earth"
                    >
                      <span className="font-semibold border-b border-orea-dark/10 pb-1 group-hover/btn:border-orea-earth">Explore</span>
                      <ArrowRight size={14} strokeWidth={1.5} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
