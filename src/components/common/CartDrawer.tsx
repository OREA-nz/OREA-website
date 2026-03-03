import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartDrawer: React.FC = () => {
  const { items, totalItems, subtotal, isDrawerOpen, closeDrawer, updateQuantity, removeItem, redirectToCheckout, isShopifyLive, shopifyCart } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-orea-dark/30 backdrop-blur-[2px] transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[65] h-full w-full max-w-md bg-orea-cream shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-orea-champagne/20">
          <h2 className="text-caption font-bold uppercase tracking-[0.4em] text-orea-dark">
            Your Bag ({totalItems})
          </h2>
          <button onClick={closeDrawer} className="text-orea-taupe hover:text-orea-dark transition-colors p-1" aria-label="Close cart">
            <X size={20} strokeWidth={1.2} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <ShoppingBag size={40} strokeWidth={0.8} className="text-orea-champagne" />
              <div className="flex flex-col gap-2">
                <p className="text-body font-light text-orea-taupe font-serif">Your bag is empty</p>
                <p className="text-body-sm text-orea-champagne">Explore our collection to find your perfect piece.</p>
              </div>
              <Link
                to="/collection"
                onClick={closeDrawer}
                className="text-micro font-bold uppercase tracking-widest text-orea-dark border-b border-orea-dark pb-1 hover:text-orea-gold-a hover:border-orea-gold-a transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const productLink = item.productHandle ? `/${item.productHandle}` : item.productId ? `/product/${item.productId}` : null;
                return (
                <div key={item.id} className="flex gap-5 pb-6 border-b border-orea-champagne/10 last:border-0">
                  {/* Thumbnail */}
                  {productLink ? (
                    <Link to={productLink} onClick={closeDrawer} className="w-20 h-24 bg-orea-linen flex-shrink-0 overflow-hidden block hover:opacity-80 transition-opacity">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={20} strokeWidth={0.8} className="text-orea-champagne" />
                        </div>
                      )}
                    </Link>
                  ) : (
                    <div className="w-20 h-24 bg-orea-linen flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={20} strokeWidth={0.8} className="text-orea-champagne" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex flex-col gap-1">
                      {productLink ? (
                        <Link to={productLink} onClick={closeDrawer} className="text-body-sm font-medium text-orea-dark tracking-wide truncate hover:text-orea-gold-a transition-colors">
                          {item.name}
                        </Link>
                      ) : (
                        <h3 className="text-body-sm font-medium text-orea-dark tracking-wide truncate">{item.name}</h3>
                      )}
                      <div className="flex flex-col gap-0.5">
                        <p className="text-micro text-orea-taupe tracking-wide">
                          {[item.metal, item.carat].filter(Boolean).join(' / ')}
                        </p>
                        {item.size && (
                          <p className="text-micro text-orea-champagne tracking-wide">Ring Size: {item.size}</p>
                        )}
                        {item.shape && (
                          <p className="text-micro text-orea-champagne tracking-wide">Diamond Shape: {item.shape}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-orea-champagne/30">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-orea-taupe hover:text-orea-dark transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-micro font-bold text-orea-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-orea-taupe hover:text-orea-dark transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      {/* Price + Remove */}
                      <div className="flex items-center gap-4">
                        <span className="text-body-sm font-light text-orea-dark">${(item.price * item.quantity).toLocaleString()}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-micro font-bold uppercase tracking-widest text-orea-champagne hover:text-orea-dark transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-orea-champagne/20 px-8 py-6 flex flex-col gap-5">
            <div className="flex justify-between items-baseline">
              <span className="text-micro font-bold uppercase tracking-widest text-orea-taupe">Subtotal</span>
              <span className="text-h5 font-light text-orea-dark">${subtotal.toLocaleString()} NZD</span>
            </div>
            <p className="text-micro text-orea-champagne tracking-wide">Shipping and tax calculated at checkout</p>

            {isShopifyLive && shopifyCart?.checkoutUrl ? (
              <a
                href={shopifyCart.checkoutUrl}
                className="w-full py-5 bg-orea-dark text-orea-cream text-micro font-bold uppercase tracking-widest hover:bg-orea-taupe transition-all text-center block"
              >
                Secure Checkout
              </a>
            ) : (
              <button
                onClick={() => { redirectToCheckout(); closeDrawer(); }}
                className="w-full py-5 bg-orea-dark text-orea-cream text-micro font-bold uppercase tracking-widest hover:bg-orea-taupe transition-all"
              >
                Proceed to Checkout
              </button>
            )}

            <Link
              to="/cart"
              onClick={closeDrawer}
              className="text-center text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark transition-colors border-b border-transparent hover:border-orea-dark pb-0.5 self-center"
            >
              View Full Bag
            </Link>
          </div>
        )}
      </div>
    </>,
    document.body
  );
};

export default CartDrawer;
