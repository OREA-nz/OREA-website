import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ──────────────────────────────────────────────
   CMS-EDITABLE CONTENT
   Update the description and details per product
   through your content management system.
   ────────────────────────────────────────────── */
const PRODUCT_DESCRIPTION = 'A celebration of modern love and classic architecture. The focal stone is held in a minimalist setting, meticulously engineered to catch the light from every angle.';

const PRODUCT_DETAILS = [
  { label: 'Diamond Shape', value: '(Selected shape) Cut' },
  { label: 'Chain Length', value: '45cm Standard (Adjustable)' },
  { label: 'Metal Choice', value: 'Solid 14k/18k Gold or Platinum' },
  { label: 'Setting Style', value: 'Minimalist Four-Prong Basket' },
];

interface ProductTabsProps {
  selectedShape?: string;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ selectedShape = 'Emerald' }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'shipping', label: 'Ordering' },
    { id: 'warranty', label: 'Our Service' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            <p className="text-body leading-relaxed font-serif" style={{ color: '#4A3F35' }}>
              {PRODUCT_DESCRIPTION}
            </p>
          </div>
        );
      case 'details':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-body font-serif leading-relaxed animate-in fade-in duration-700" style={{ color: '#4A3F35' }}>
            {PRODUCT_DETAILS.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <p className="text-micro font-bold uppercase tracking-widest" style={{ color: '#4A3F35' }}>{item.label}</p>
                <p>{item.label === 'Diamond Shape' ? `${selectedShape} Cut` : item.value}</p>
              </div>
            ))}
          </div>
        );
      case 'shipping':
        return (
          <div className="flex flex-col gap-4 text-body font-serif leading-relaxed animate-in fade-in duration-700" style={{ color: '#4A3F35' }}>
            <p>Our pieces are made to order and typically take between 2-8 weeks to produce, depending on the design.</p>
            <p>We also offer a curated selection available to ship within 7-10 days for time-sensitive gifts. If you are working toward a tight timeline or require your piece by a specific date, please contact us and we'll do our best to accommodate.</p>
            <p>For detailed delivery information, please refer to our <Link to="/shipping" className="border-b border-orea-champagne pb-0.5 hover:opacity-70 transition-opacity" style={{ color: '#4A3F35' }}>Shipping Information page</Link>.</p>
          </div>
        );
      case 'warranty':
        return (
          <div className="flex flex-col gap-4 text-body font-serif leading-relaxed animate-in fade-in duration-700" style={{ color: '#4A3F35' }}>
            <p>ORÉA jewellery is crafted in solid gold or platinum and set with certified, 100% real lab-grown diamonds.</p>
            <p>Fine jewellery is covered by a 2-Year Manufacturing Warranty, with optional <Link to="/concierge" className="underline underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: '#4A3F35' }}>ORÉA Concierge Service</Link> available for extended care.</p>
            <p className="text-body pt-2 leading-relaxed font-serif opacity-70">
              Please note: Normal wear and tear, improper care, third-party repairs, scratches, loss or theft, and discolouration caused by harsh chemicals are not covered. Each ORÉA piece is handcrafted to order; slight variations are a natural part of its character.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-orea-sand">
      <div className="flex border-b border-orea-sand/50 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-6 px-2 text-micro font-bold tracking-widest uppercase transition-all relative whitespace-nowrap outline-none flex-1 text-center ${
              activeTab === tab.id ? 'text-orea-dark' : 'text-orea-taupe hover:text-orea-dark/60'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-px bg-orea-champagne" />}
          </button>
        ))}
      </div>
      <div className="py-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductTabs;
