'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, Variant } from './types';
import { useCart } from '../../context/CartContext';
import SendAHintModal from './SendAHintModal';
import GiftReminderModal from './GiftReminderModal';
import DiamondShapeSelector from '../../components/product/DiamondShapeSelector';

interface ProductDetailsProps {
  product: Product;
  selectedMetal: string;
  setSelectedMetal: (metal: string) => void;
  selectedShape: string;
  setSelectedShape: (shape: string) => void;
}

const metalMetadata: Record<string, { label: string; text: string; gradient: string }> = {
  'Platinum': { label: 'Platinum(950)', text: 'PL', gradient: 'linear-gradient(135deg, #E8DFD3 0%, #D4C4A8 50%, #F9F6F1 100%)' },
  '18k Yellow Gold': { label: '18k Yellow Gold', text: '18K', gradient: 'linear-gradient(135deg, #EFD695 0%, #C5B8A0 50%, #F7E8C1 100%)' },
  '18k White Gold': { label: '18k White Gold', text: '18K', gradient: 'linear-gradient(135deg, #F8F8F8 0%, #E8DFD3 50%, #F9F6F1 100%)' },
  '14k Yellow Gold': { label: '14k Yellow Gold', text: '14K', gradient: 'linear-gradient(135deg, #EFD695 0%, #C5B8A0 50%, #F7E8C1 100%)' },
  '14k White Gold': { label: '14k White Gold', text: '14K', gradient: 'linear-gradient(135deg, #F8F8F8 0%, #E8DFD3 50%, #F9F6F1 100%)' }
};



const ProductDetails: React.FC<ProductDetailsProps> = ({ product, selectedMetal, setSelectedMetal, selectedShape, setSelectedShape }) => {
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isMetalInfoOpen, setIsMetalInfoOpen] = useState(false);
  const [isShapeInfoOpen, setIsShapeInfoOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product.variants) {
      // Variant is resolved by Metal only — Diamond Shape is a line item property, not a Shopify variant
      const match = product.variants.find(v => v.option1?.trim() === selectedMetal.trim());
      setCurrentVariant(match || null);
    }
  }, [selectedMetal, product.variants]);

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    setStatusMsg(null);
    try {
      addToCart({
        productId: product.id,
        variantId: currentVariant?.id?.toString(),
        name: product.name,
        price: currentVariant?.price || product.price,
        metal: selectedMetal,
        // Diamond Shape is passed as a Shopify line item property via CartContext
        shape: selectedShape,
        image: product.images?.[0],
      });
      setStatusMsg({ type: 'success', text: 'Added to your bag' });
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to add' });
    } finally {
      setIsAdding(false);
    }
  };

  const currentMetalInfo = metalMetadata[selectedMetal] || { label: selectedMetal, text: '', gradient: '#D9CFC1' };
  const labelStyle = "text-micro font-bold uppercase tracking-widest text-orea-dark";

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-h3 font-light text-orea-dark tracking-wide font-serif uppercase leading-tight">{product.name}</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-h4 text-orea-dark font-light tracking-wide">{`$${(currentVariant?.price || product.price).toLocaleString()} NZD`}</span>
          {currentVariant && !currentVariant.available && <span className="text-micro font-bold text-orea-taupe uppercase tracking-widest ml-2">Out of Stock</span>}
        </div>
      </div>

      {/* Metal */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <label className={labelStyle}>Metal:</label>
          <span className="text-body-sm font-light text-orea-taupe tracking-wide">{currentMetalInfo.label}</span>
          <button onClick={() => setIsMetalInfoOpen(true)} className="text-orea-champagne hover:text-orea-dark transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-5 items-center">
          {product.options.metal.map((metal) => {
            const info = metalMetadata[metal];
            const isActive = selectedMetal === metal;
            return (
              <button key={metal} onClick={() => setSelectedMetal(metal)} className="relative flex items-center justify-center transition-all duration-300 group focus:outline-none">
                <div className={`absolute inset-0 border rounded-full transition-all duration-300 ${isActive ? 'scale-125 border-orea-dark' : 'scale-100 border-transparent group-hover:border-orea-sand'}`} style={{ width: '40px', height: '40px', margin: 'auto' }} />
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-micro font-bold tracking-tighter transition-all duration-300 border border-orea-sand shadow-sm ${isActive ? 'scale-90 text-orea-dark' : 'text-orea-taupe hover:scale-105'}`} style={{ background: info ? info.gradient : '#E8DFD3' }}>
                  {info ? info.text : metal.charAt(0)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Shape */}
      <DiamondShapeSelector
        shapes={product.options.shape}
        selectedShape={selectedShape}
        onShapeChange={setSelectedShape}
      />

      <div className="flex flex-col gap-3 pt-6">
        <button onClick={handleAddToCart} disabled={isAdding || (currentVariant !== null && !currentVariant.available)} className={`w-full py-6 text-micro font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isAdding || (currentVariant && !currentVariant.available) ? 'bg-orea-sand text-orea-taupe cursor-not-allowed border border-orea-sand' : 'bg-orea-dark text-orea-cream hover:bg-orea-taupe'}`}>
          {isAdding && <div className="w-3 h-3 border-2 border-orea-champagne border-t-orea-dark rounded-full animate-spin" />}
          <span>{isAdding ? 'Adding...' : (currentVariant && !currentVariant.available ? 'Out of Stock' : 'Add to Bag')}</span>
        </button>

        {statusMsg && <p className={`text-micro font-bold uppercase tracking-widest text-center animate-in slide-in-from-top-2 ${statusMsg.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{statusMsg.text}</p>}

        <div className="flex flex-col gap-4 pt-4 items-center">
          <Link to="/contact" className="w-full border border-orea-sand text-orea-dark py-6 text-micro font-bold uppercase tracking-widest hover:bg-orea-sand transition-colors text-center block">Contact Us</Link>
          <div className="flex w-full justify-center gap-6 sm:gap-12 pt-2 flex-wrap">
            <button onClick={() => setIsHintModalOpen(true)} className="flex items-center gap-2.5 text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark transition-all group justify-center">
              <svg className="w-4 h-4 text-orea-champagne group-hover:text-orea-dark transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="0.8"/></svg>
              <span className="border-b border-transparent group-hover:border-orea-dark pb-0.5">Send a Hint</span>
            </button>
            <button onClick={() => setIsReminderModalOpen(true)} className="flex items-center gap-2.5 text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark transition-all group justify-center">
              <svg className="w-4 h-4 text-orea-champagne group-hover:text-orea-dark transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="14" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" /><path d="M5 10H19" stroke="currentColor" strokeWidth="0.8" /><circle cx="12" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="0.8" /></svg>
              <span className="border-b border-transparent group-hover:border-orea-dark pb-0.5">Save for Occasion</span>
            </button>
          </div>
        </div>
      </div>

      <SendAHintModal isOpen={isHintModalOpen} onClose={() => setIsHintModalOpen(false)} product={product} />
      <GiftReminderModal isOpen={isReminderModalOpen} onClose={() => setIsReminderModalOpen(false)} product={product} />

      {isMetalInfoOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-orea-dark/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-orea-cream w-full max-w-lg p-10 md:p-12 rounded-sm relative shadow-2xl">
            <button onClick={() => setIsMetalInfoOpen(false)} className="absolute top-6 right-6 text-orea-taupe hover:text-orea-dark"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h4 className="text-h4 font-light mb-6 font-serif text-orea-dark uppercase tracking-wide">Precious Metal</h4>
            <div className="text-body-sm text-orea-taupe font-light leading-relaxed flex flex-col gap-4">
              <p>At ORÉA, our pieces are made to last a lifetime -- not to end up in a landfill. We use only solid 14k or 18k gold and platinum, never plated, filled, or vermeil.</p>
              <p>Precious metals are inherently durable, repairable, and timeless -- the ultimate expression of lasting value.</p>
            </div>
          </div>
        </div>
      )}

      {isShapeInfoOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-orea-dark/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-orea-cream w-full max-w-lg p-10 md:p-12 rounded-sm relative shadow-2xl">
            <button onClick={() => setIsShapeInfoOpen(false)} className="absolute top-6 right-6 text-orea-taupe hover:text-orea-dark"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h4 className="text-h4 font-light mb-6 font-serif text-orea-dark uppercase tracking-wide">Diamond Shapes</h4>
            <div className="text-body-sm text-orea-taupe font-light leading-relaxed flex flex-col gap-4">
              <p>The shape of a diamond can dramatically affect the appearance of your piece. From the classic brilliance of a Round cut to the architectural lines of an Emerald cut, each shape offers a unique personality.</p>
              <p>At ORÉA, we curate only the finest cuts to ensure maximum light return and aesthetic balance regardless of your chosen silhouette.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
