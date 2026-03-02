'use client';


import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from './CartDrawer';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'shop' | 'concierge' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, openDrawer } = useCart();
  const { user } = useAuth();

  const location = useLocation();

  // Close all menus/dropdowns on any route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const shopLinks = [
    { name: 'RINGS', link: '/collection?category=Rings' },
    { name: 'NECKLACES', link: '/collection?category=Necklaces' },
    { name: 'EARRINGS', link: '/collection?category=Earrings' },
    { name: 'BRACELETS', link: '/collection?category=Bracelets' },
    { name: 'PENDANTS', link: '/collection?category=Pendants' },
  ];

  const conciergeData = [
    {
      category: 'ABOUT',
      links: [
        { name: 'About ORÉA', link: '/about' },
        { name: 'About Lab-Grown Diamonds', link: '/diamonds' },
      ]
    },
    {
      category: 'BESPOKE',
      links: [
        { name: 'Bespoke Process', link: '/bespoke', highlighted: true },
        { name: 'Concierge Service', link: '/concierge' },
      ]
    },
    {
      category: 'CLIENT CARE',
      links: [
        { name: 'Client Care', link: '/faq' },
        { name: 'Jewellery Care', link: '/care-guide' },
        { name: 'Delivery', link: '/shipping' },
        { name: 'Returns', link: '/returns' },
        { name: 'Begin a Conversation', link: '/contact', highlighted: true },
      ]
    }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 mb-[120px] ${
        isScrolled || activeDropdown ? 'bg-orea-cream/[0.98] backdrop-blur-sm border-b border-orea-champagne/10 py-4 md:py-5' : 'bg-transparent py-6 md:py-10'
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Left Pillar Navigation */}
        <div className="hidden lg:flex items-center gap-12 text-caption tracking-[0.4em] font-medium text-orea-dark uppercase">
          <div 
            className="relative group py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('shop')}
          >
            <Link to="/collection" onClick={() => setActiveDropdown(null)} className={`hover:text-orea-gold-a transition-colors duration-500 ${activeDropdown === 'shop' ? 'text-orea-gold-a' : ''}`}>
              Shop
            </Link>
          </div>
          
          <div 
            className="relative group py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('concierge')}
          >
            <span className={`hover:text-orea-gold-a transition-colors duration-500 ${activeDropdown === 'concierge' ? 'text-orea-gold-a' : ''}`}>
              Concierge
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-orea-dark p-1" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
          <Menu size={20} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link to="/" onClick={() => setActiveDropdown(null)} className="font-serif text-h3 tracking-[0.15em] text-orea-dark hover:opacity-70 transition-opacity duration-700">
            ORÉA
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-8 text-orea-dark">
          <button onClick={() => setIsSearchOpen(true)} className="p-1 hover:text-orea-gold-a transition-colors duration-500" aria-label="Search">
            <Search size={18} strokeWidth={1.2} />
          </button>
          
          <Link
            to={user ? '/profile' : '/auth'}
            className="hidden sm:block p-1 hover:text-orea-gold-a transition-colors duration-500"
            aria-label="Account"
          >
            <User size={18} strokeWidth={1.2} />
          </Link>
          
          <button onClick={openDrawer} className="p-1 hover:text-orea-gold-a transition-colors duration-500 relative" aria-label="Shopping Bag">
            <ShoppingBag size={18} strokeWidth={1.2} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 text-micro bg-orea-dark text-orea-cream w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SHOP Dropdown (Desktop only) */}
      <div className={`hidden lg:block absolute left-0 w-full bg-orea-cream transition-all duration-700 ease-in-out overflow-hidden shadow-[0_30px_60px_-15px_rgba(74,63,53,0.1)] ${
        activeDropdown === 'shop' ? 'max-h-[850px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-row items-start">
          <div className="w-auto min-w-40 pt-3 shrink-0">
            <ul className="flex flex-col gap-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.link} 
                    onClick={() => setActiveDropdown(null)}
                    className="text-body-sm tracking-[0.4em] uppercase text-orea-dark hover:text-orea-gold-a transition-all duration-500 font-normal block hover:translate-x-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-sm ml-auto">
            <div className="flex flex-col gap-6">
              <Link to="/collection" onClick={() => setActiveDropdown(null)} className="relative group overflow-hidden bg-orea-linen aspect-square block">
                <img 
                  src="/images/nav-signature.jpg"
                  alt="Featured Signature Product" 
                  className="w-full h-full object-cover object-center grayscale-[15%] group-hover:scale-105 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-orea-dark/5 group-hover:bg-orea-dark/10 transition-colors duration-700"></div>
              </Link>
              <Link 
                to="/collection" 
                onClick={() => setActiveDropdown(null)}
                className="inline-flex items-center gap-6 text-caption tracking-[0.4em] uppercase text-orea-dark border-b border-orea-dark/10 pb-2 hover:border-orea-dark transition-all duration-500 group self-start"
              >
                <span className="font-medium">View All Pieces</span>
                <ArrowRight size={16} strokeWidth={1} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
          </div>
          <div className="w-full max-w-sm ml-16">
            <div className="flex flex-col gap-6">
              <Link to="/bespoke" onClick={() => setActiveDropdown(null)} className="relative group overflow-hidden bg-orea-linen aspect-square block">
                <img 
                  src="/images/nav-bespoke.jpg"
                  alt="The Bespoke Journey" 
                  className="w-full h-full object-cover object-center grayscale-[20%] group-hover:scale-105 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-orea-dark/5 group-hover:bg-orea-dark/10 transition-colors duration-700"></div>
              </Link>
              <div className="flex flex-col items-start py-2">
                <Link 
                  to="/bespoke" 
                  onClick={() => setActiveDropdown(null)}
                  className="text-body-sm tracking-[0.15em] text-orea-dark hover:text-orea-gold-a transition-colors duration-500 font-light flex items-center group"
                >
                  <span className="opacity-80">{'Looking for something custom?'}</span>
                  <span className="text-orea-gold mx-3 group-hover:translate-x-1 transition-transform">{'→'}</span>
                  <span className="uppercase tracking-[0.3em] font-medium border-b border-transparent group-hover:border-orea-dark transition-all">Begin Bespoke</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-orea-champagne/5 flex justify-between items-center text-micro tracking-[0.3em] uppercase text-orea-dark/40 font-light">
          <span>Sustainably grown diamonds</span>
          <span>Complimentary NZ Delivery</span>
        </div>
      </div>

      {/* CONCIERGE Dropdown (Desktop only) */}
      <div className={`hidden lg:block absolute left-0 w-full bg-orea-cream transition-all duration-700 ease-in-out overflow-hidden shadow-[0_30px_60px_-15px_rgba(74,63,53,0.1)] ${
        activeDropdown === 'concierge' ? 'max-h-[600px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-section-sm grid grid-cols-3 gap-24">
          {conciergeData.map((section) => (
            <div key={section.category} className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h4 className="font-serif text-caption tracking-[0.6em] text-orea-dark uppercase font-normal">
                  {section.category}
                </h4>
                <div className="w-8 h-px bg-orea-gold/30"></div>
              </div>
              <ul className="flex flex-col gap-6">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.link} 
                      onClick={() => setActiveDropdown(null)}
                      className={`text-body-sm tracking-[0.3em] uppercase transition-all duration-500 block relative group text-orea-dark hover:text-orea-gold-a font-normal
                        ${link.highlighted ? 'inline-flex items-center' : 'hover:translate-x-2'}`}
                    >
                      {link.name}
                      {link.highlighted && (
                        <span className="inline-flex items-center ml-4">
                          <ArrowRight size={16} strokeWidth={1} className="text-orea-gold group-hover:translate-x-2 transition-transform" />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay — rendered via portal to ensure it's fixed to the viewport */}
      {createPortal(
        <div className={`fixed inset-0 bg-orea-cream z-[60] flex flex-col p-8 md:p-12 transition-all duration-700 transform-gpu ${isMenuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-h3 tracking-widest text-orea-dark uppercase">ORÉA</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-orea-dark p-2" aria-label="Close menu">
              <X size={24} strokeWidth={1.2} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pb-12 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <Link to="/collection" className="text-caption tracking-[0.4em] uppercase text-orea-gold-a font-bold" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <div className="flex flex-col gap-6">
                {shopLinks.map(link => (
                  <Link key={link.name} to={link.link} className="text-body tracking-[0.2em] uppercase text-orea-dark font-light" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
                ))}
              </div>
            </div>
            
            {conciergeData.map(section => (
              <div key={section.category} className="flex flex-col gap-6">
                <p className="text-caption tracking-[0.4em] uppercase text-orea-gold-a font-bold">{section.category}</p>
                <div className="flex flex-col gap-6">
                  {section.links.map(link => (
                    <Link key={link.name} to={link.link} 
                      className={`text-body tracking-[0.2em] uppercase text-orea-dark font-light ${link.highlighted ? 'text-orea-gold-a' : ''}`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Bottom Bar */}
          <div className="pt-8 border-t border-orea-champagne/20 flex justify-center gap-12">
             <button onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }} aria-label="Search">
               <Search size={20} strokeWidth={1} className="text-orea-dark" />
             </button>
             <Link to="/auth" onClick={() => setIsMenuOpen(false)} aria-label="Account">
               <User size={20} strokeWidth={1} className="text-orea-dark" />
             </Link>
          </div>
        </div>,
        document.body
      )}

      {/* Search Overlay — rendered via portal to ensure it's fixed to the viewport */}
      {createPortal(
        <div className={`fixed inset-0 z-[70] bg-orea-cream/[0.98] backdrop-blur-sm transition-all duration-500 flex flex-col items-center justify-start pt-32 px-8 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-orea-taupe hover:text-orea-dark transition-colors" aria-label="Close search">
            <X size={24} strokeWidth={1.2} />
          </button>
          <form onSubmit={handleSearch} className="w-full max-w-lg flex flex-col items-center gap-8">
            <h3 className="text-caption font-bold uppercase tracking-[0.4em] text-orea-dark">Search</h3>
            <div className="w-full relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-b border-orea-dark/20 focus:border-orea-dark py-4 text-body font-light text-orea-dark placeholder:text-orea-champagne outline-none transition-colors"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-orea-taupe hover:text-orea-dark transition-colors" aria-label="Submit search">
                <Search size={18} strokeWidth={1.2} />
              </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((term) => (
                <Link
                  key={term}
                  to={`/collection?category=${term}`}
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark border border-orea-champagne/20 px-4 py-2 hover:border-orea-dark transition-all"
                >
                  {term}
                </Link>
              ))}
            </div>
          </form>
        </div>,
        document.body
      )}

      {/* Cart Drawer — rendered via portal to ensure it's fixed to the viewport */}
      <CartDrawer />
    </nav>
  );
};

export default Navbar;
