import React from 'react';

const CompleteTheLook: React.FC = () => {
  const items = [
    { name: 'Emerald Eternity Band', price: 950, img: 'https://www.orea.co.nz/cdn/shop/files/EmeraldBand_600x.jpg' },
    { name: 'Classic Gold Studs', price: 450, img: 'https://www.orea.co.nz/cdn/shop/files/GoldStuds_600x.jpg' },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="text-center">
        <h3 className="text-h3 font-light font-serif italic tracking-wide text-orea-dark mb-2">Complete the Look</h3>
        <p className="text-micro font-bold uppercase tracking-widest text-orea-taupe">Artfully curated pairings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="group cursor-pointer flex items-center gap-8 bg-orea-cream p-6 border border-orea-sand/20 hover:border-orea-champagne/40 transition-all">
            <div className="w-32 h-32 flex-shrink-0 aspect-square bg-orea-sand/20 overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-orea-sand/10 flex items-center justify-center text-micro uppercase tracking-widest text-orea-taupe/40 font-bold">Image</div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-serif text-caption font-bold uppercase tracking-wider text-orea-dark">{item.name}</h4>
              <p className="text-body-sm text-orea-taupe font-light">${item.price} NZD</p>
              <button className="text-micro font-bold uppercase tracking-widest text-orea-dark border-b border-orea-dark/20 hover:border-orea-dark transition-all pt-2 w-fit">Add +</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompleteTheLook;
