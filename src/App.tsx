import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

/** Scrolls to the top of the page on every route or query-string change */
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
}

// Main Pages
import HomePage from './pages/home/HomePage';
import AboutOreaPage from './pages/about-orea/AboutOreaPage';
import AboutDiamondsPage from './pages/about-diamonds/AboutDiamondsPage';
import BespokePage from './pages/bespoke/BespokePage';
import CollectionPage from './pages/collection/CollectionPage';
import ConciergePage from './pages/concierge/ConciergePage';
import ContactPage from './pages/contact/ContactPage';
import FAQPage from './pages/faq/FAQPage';
import CareGuidePage from './pages/care-guide/CareGuidePage';
import BoutiquePage from './pages/boutique/BoutiquePage';
import ProductPage from './pages/product/ProductPage';
import ProductShapePage from './pages/product-shape/ProductShapePage';
import ReturnsPage from './pages/returns/ReturnsPage';
import ShippingPage from './pages/shipping/ShippingPage';
import TermsPage from './pages/terms/TermsPage';
import AuthPage from './pages/auth/AuthPage';
import ProfilePage from './pages/auth/ProfilePage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/cart/CheckoutPage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <ScrollToTop />
      <div className="min-h-screen">{/*Each page has its own background and styling*/}
        <Navbar />
        
        {/* Global spacer: 120px breathing room below the fixed navbar */}
        <main className="pt-[120px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutOreaPage />} />
          <Route path="/diamonds" element={<AboutDiamondsPage />} />
          <Route path="/bespoke" element={<BespokePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/concierge" element={<ConciergePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/care-guide" element={<CareGuidePage />} />
          <Route path="/boutique" element={<BoutiquePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/:id/:shape" element={<ProductShapePage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
