'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Product, Variant } from './types';
import { useCart } from '../../context/CartContext';
import SizeGuideModal from './SizeGuideModal';
import SendAHintModal from './SendAHintModal';
import VirtualTryOn from './VirtualTryOn';

interface ProductDetailsProps {
  product: Product;
  selectedMetal: string;
  setSelectedMetal: (metal: string) => void;
  selectedCarat: string;
  setSelectedCarat: (carat: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const metalMetadata: Record<string, { label: string; color: string; gradient: string }> = {
  'Platinum': { label: 'Platinum', color: '#E8DFD3', gradient: 'linear-gradient(135deg, #E8DFD3 0%, #D4C4A8 100%)' },
  '18k Yellow Gold': { label: '18k Yellow Gold', color: '#EFD695', gradient: 'linear-gradient(135deg, #EFD695 0%, #C5B8A0 100%)' },
  '18k White Gold': { label: '18k White Gold', color: '#F8F8F8', gradient: 'linear-gradient(135deg, #F8F8F8 0%, #E8DFD3 100%)' },
  '14k Yellow Gold': { label: '14k Yellow Gold', color: '#EFD695', gradient: 'linear-gradient(135deg, #EFD695 0%, #C5B8A0 100%)' },
  '14k White Gold': { label: '14k White Gold', color: '#F8F8F8', gradient: 'linear-gradient(135deg, #F8F8F8 0%, #E8DFD3 100%)' }
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  selectedMetal, setSelectedMetal,
  selectedCarat, setSelectedCarat,
  selectedSize, setSelectedSize
}) => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const { addToCart: addToCartCtx } = useCart();
  const navigate = useNavigate();

  const isInquiryRequired = selectedCarat?.toLowerCase().includes('3+');

  // Ring size is sent as a Shopify line item property (not a variant option)

  useEffect(() => {
    if (product.variants) {
      const match = product.variants.find(v => v.option1?.trim() === selectedMetal.trim() && v.option2?.trim() === selectedCarat.trim());
      setCurrentVariant(match || null);
    }
  }, [selectedMetal, selectedCarat, product.variants]);

  const price = currentVariant?.price || product.price;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-h3 font-light text-orea-dark tracking-wide font-serif italic">{product.name}</h1>
        <div className="flex items-center gap-6">
          <p className="text-h5 text-orea-taupe font-light tracking-wide">${price.toLocaleString()} NZD</p>
          <button
            onClick={() => setIsTryOnOpen(true)}
            className="flex items-center gap-2 text-micro font-bold uppercase tracking-wider text-orea-dark border-b border-orea-dark/30 pb-0.5 hover:border-orea-dark transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth={1} /></svg>
            <span>Virtual Try-On</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <label className="text-micro font-bold uppercase tracking-widest text-orea-dark">Metal: <span className="font-normal text-orea-taupe ml-2">{selectedMetal}</span></label>
          <div className="flex flex-wrap gap-4">
            {product.options.metal.map((metal) => (
              <button
                key={metal}
                onClick={() => setSelectedMetal(metal)}
                className={`w-10 h-10 rounded-full border transition-all relative ${selectedMetal === metal ? 'border-orea-dark scale-110' : 'border-orea-sand hover:border-orea-taupe'}`}
                style={{ background: metalMetadata[metal]?.gradient || '#E8DFD3' }}
                title={metal}
              >
                {selectedMetal === metal && <div className="absolute inset-[-4px] border border-orea-dark/20 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-micro font-bold uppercase tracking-widest text-orea-dark">Diamond Size</label>
          <div className="grid grid-cols-3 gap-2">
            {product.options.carat.map((carat) => (
              <button
                key={carat}
                onClick={() => setSelectedCarat(carat)}
                className={`py-4 text-micro font-bold uppercase tracking-wider border transition-all ${selectedCarat === carat ? 'bg-orea-dark text-orea-cream border-orea-dark' : 'text-orea-taupe border-orea-sand hover:border-orea-taupe'}`}
              >
                {carat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-micro font-bold uppercase tracking-widest text-orea-dark">Ring Size</label>
            <button onClick={() => setIsSizeGuideOpen(true)} className="text-micro font-bold uppercase tracking-wider text-orea-dark underline underline-offset-4">Size Guide</button>
          </div>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full py-4 px-4 bg-transparent border border-orea-sand text-caption font-bold uppercase tracking-widest focus:outline-none focus:border-orea-dark appearance-none cursor-pointer text-orea-dark"
          >
            {product.options.size.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6">
        {isInquiryRequired ? (
          <button
            onClick={() => navigate('/contact')}
            className="w-full py-6 bg-orea-dark text-orea-cream text-caption font-bold uppercase tracking-widest hover:bg-orea-taupe transition-all flex items-center justify-center gap-2"
          >
            Inquiry Required
          </button>
        ) : (
          <button
            onClick={() => {
              setIsAdding(true);
              addToCartCtx({
                productId: product.id,
                variantId: currentVariant?.id?.toString(),
                name: product.name,
                price: currentVariant?.price || product.price,
                metal: selectedMetal,
                carat: selectedCarat,
                // Ring Size is passed as a Shopify line item property via CartContext
                size: selectedSize,
                image: product.images?.[0],
              });
              setTimeout(() => setIsAdding(false), 600);
            }}
            className="w-full py-6 bg-orea-dark text-orea-cream text-caption font-bold uppercase tracking-widest hover:bg-orea-taupe transition-all flex items-center justify-center gap-2"
          >
            {isAdding ? <div className="w-4 h-4 border-2 border-orea-cream/30 border-t-orea-cream rounded-full animate-spin" /> : 'Add to Bag'}
          </button>
        )}

        <Link
          to="/contact"
          className="w-full border border-orea-sand text-orea-dark py-6 text-micro font-bold uppercase tracking-widest hover:bg-orea-sand transition-colors text-center block"
        >
          Contact Us
        </Link>

        <div className="flex justify-center gap-8 pt-4">
          <button onClick={() => setIsHintModalOpen(true)} className="text-micro font-bold uppercase tracking-wider text-orea-taupe hover:text-orea-dark transition-colors">Send a Hint</button>
          <Link to="/concierge" className="text-micro font-bold uppercase tracking-wider text-orea-taupe hover:text-orea-dark transition-colors">Contact Concierge</Link>
        </div>
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <SendAHintModal isOpen={isHintModalOpen} onClose={() => setIsHintModalOpen(false)} product={product} />
      <VirtualTryOn isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} />
    </div>
  );
};

export default ProductDetails;
