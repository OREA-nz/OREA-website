import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartPage: React.FC = () => {
  const { items, totalItems, subtotal, updateQuantity, removeItem, redirectToCheckout, isShopifyLive } = useCart();

  return (
    <section className="min-h-[80vh] bg-orea-cream px-6 py-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-h2 font-light text-orea-dark tracking-wide font-serif uppercase">Your Bag</h1>
          <span className="text-body-sm text-orea-taupe font-light">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-8 text-center">
            <ShoppingBag size={48} strokeWidth={0.7} className="text-orea-champagne" />
            <div className="flex flex-col gap-3">
              <p className="text-h4 font-light text-orea-taupe font-serif">Your bag is empty</p>
              <p className="text-body-sm text-orea-champagne">Discover timeless pieces crafted for a lifetime.</p>
            </div>
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 text-micro font-bold uppercase tracking-widest text-orea-dark border-b border-orea-dark pb-1 hover:text-orea-gold-a hover:border-orea-gold-a transition-colors group"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex flex-col">
              {items.map((item, idx) => {
                const productLink = item.productHandle ? `/${item.productHandle}` : item.productId ? `/product/${item.productId}` : null;
                return (
                <div key={item.id} className={`flex gap-6 py-8 ${idx > 0 ? 'border-t border-orea-champagne/15' : ''}`}>
                  {/* Thumbnail */}
                  {productLink ? (
                    <Link to={productLink} className="w-28 h-36 bg-orea-linen flex-shrink-0 overflow-hidden block hover:opacity-80 transition-opacity">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={24} strokeWidth={0.7} className="text-orea-champagne" />
                        </div>
                      )}
                    </Link>
                  ) : (
                    <div className="w-28 h-36 bg-orea-linen flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={24} strokeWidth={0.7} className="text-orea-champagne" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        {productLink ? (
                          <Link to={productLink} className="text-body font-medium text-orea-dark tracking-wide hover:text-orea-gold-a transition-colors">
                            {item.name}
                          </Link>
                        ) : (
                          <h3 className="text-body font-medium text-orea-dark tracking-wide">{item.name}</h3>
                        )}
                        <p className="text-micro text-orea-taupe tracking-wide">
                          {[item.metal, item.carat, item.size, item.shape].filter(Boolean).join(' / ')}
                        </p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-orea-champagne hover:text-orea-dark transition-colors p-1" aria-label="Remove item">
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-orea-champagne/30">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-orea-taupe hover:text-orea-dark transition-colors" aria-label="Decrease quantity">
                          <Minus size={14} strokeWidth={1.5} />
                        </button>
                        <span className="w-10 h-10 flex items-center justify-center text-body-sm font-medium text-orea-dark">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-orea-taupe hover:text-orea-dark transition-colors" aria-label="Increase quantity">
                          <Plus size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-body font-light text-orea-dark">${(item.price * item.quantity).toLocaleString()} NZD</span>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="border-t border-orea-champagne/15 pt-8 flex flex-col gap-6">
              <div className="flex justify-between items-baseline">
                <span className="text-micro font-bold uppercase tracking-widest text-orea-taupe">Subtotal</span>
                <span className="text-h4 font-light text-orea-dark">${subtotal.toLocaleString()} NZD</span>
              </div>
              <p className="text-micro text-orea-champagne tracking-wide">Shipping, taxes, and discount codes calculated at checkout.</p>

              <button
                onClick={redirectToCheckout}
                className="w-full py-6 bg-orea-dark text-orea-cream text-micro font-bold uppercase tracking-widest hover:bg-orea-taupe transition-all"
              >
                {isShopifyLive ? 'Secure Checkout' : 'Proceed to Checkout'}
              </button>

              {isShopifyLive && (
                <p className="text-micro text-orea-champagne tracking-wide text-center">
                  You will be redirected to our secure checkout.
                </p>
              )}

              <Link
                to="/collection"
                className="self-center text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark transition-colors border-b border-transparent hover:border-orea-dark pb-0.5"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
