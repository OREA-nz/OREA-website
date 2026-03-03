import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

/**
 * CheckoutPage
 *
 * When Shopify is configured this page auto-redirects to the
 * secure Shopify-hosted checkout URL. No custom credit card forms.
 */
const CheckoutPage: React.FC = () => {
  const { redirectToCheckout, isShopifyLive, items } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isShopifyLive && items.length > 0) {
      setRedirecting(true);
      // Small delay to show the redirect message
      const timer = setTimeout(() => {
        redirectToCheckout();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isShopifyLive, items, redirectToCheckout]);

  return (
    <section className="min-h-[80vh] bg-orea-cream flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center flex flex-col items-center gap-8">
        {redirecting ? (
          <>
            <div className="w-8 h-8 border-2 border-orea-champagne border-t-orea-dark rounded-full animate-spin" />
            <div className="flex flex-col gap-3">
              <h1 className="text-h3 font-light text-orea-dark tracking-wide font-serif uppercase">Redirecting to Checkout</h1>
              <p className="text-body-sm text-orea-taupe font-light tracking-wide">
                Taking you to our secure Shopify checkout...
              </p>
            </div>
          </>
        ) : items.length === 0 ? (
          <>
            <h1 className="text-h3 font-light text-orea-dark tracking-wide font-serif uppercase">Your Bag is Empty</h1>
            <p className="text-body-sm text-orea-taupe font-light tracking-wide">
              Add some pieces to your bag before checking out.
            </p>
            <Link
              to="/collection"
              className="text-micro font-bold uppercase tracking-widest text-orea-dark border-b border-orea-dark pb-1 hover:text-orea-gold-a hover:border-orea-gold-a transition-colors"
            >
              Explore Collection
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <h1 className="text-h3 font-light text-orea-dark tracking-wide font-serif uppercase">Checkout</h1>
              <p className="text-body-sm text-orea-taupe font-light tracking-wide">
                Connect your Shopify store to enable secure checkout. All payment processing is handled by Shopify -- we never store your card details.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Link
                to="/cart"
                className="w-full py-5 bg-orea-dark text-orea-cream text-micro font-bold uppercase tracking-widest hover:bg-orea-taupe transition-all text-center"
              >
                Return to Bag
              </Link>
              <Link
                to="/contact"
                className="w-full py-5 border border-orea-sand text-orea-dark text-micro font-bold uppercase tracking-widest hover:bg-orea-sand transition-all text-center"
              >
                Contact Concierge
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CheckoutPage;
