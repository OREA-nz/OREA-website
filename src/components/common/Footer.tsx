
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orea-dark text-orea-cream py-section px-4 sm:px-6 lg:px-8 isolate transform-gpu mt-[120px]">
      <div className="max-w-wide mx-auto relative">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-x-12 items-start">
          
          {/* Column 1 - SHOP */}
          <div className="flex flex-col gap-10">
            <h4 className="font-serif text-caption tracking-[0.4em] uppercase text-orea-champagne font-semibold leading-none">SHOP</h4>
            <ul className="flex flex-col gap-5 text-caption tracking-[0.2em] font-light uppercase">
              <li><Link to="/collection?category=Rings" className="hover:text-orea-gold transition-colors duration-500">Rings</Link></li>
              <li><Link to="/collection?category=Necklaces" className="hover:text-orea-gold transition-colors duration-500">Necklaces</Link></li>
              <li><Link to="/collection?category=Earrings" className="hover:text-orea-gold transition-colors duration-500">Earrings</Link></li>
              <li><Link to="/collection?category=Bracelets" className="hover:text-orea-gold transition-colors duration-500">Bracelets</Link></li>
              <li><Link to="/collection?category=Pendants" className="hover:text-orea-gold transition-colors duration-500">Pendants</Link></li>
            </ul>
          </div>

          {/* Column 2 - HELP */}
          <div className="flex flex-col gap-10">
            <h4 className="font-serif text-caption tracking-[0.4em] uppercase text-orea-champagne font-semibold leading-none">HELP</h4>
            <ul className="flex flex-col gap-5 text-caption tracking-[0.2em] font-light uppercase">
              <li><Link to="/faq" className="hover:text-orea-gold transition-colors duration-500">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-orea-gold transition-colors duration-500">Contact Us</Link></li>
              <li><Link to="/care-guide" className="hover:text-orea-gold transition-colors duration-500">Care Guide</Link></li>
              <li><Link to="/shipping" className="hover:text-orea-gold transition-colors duration-500">{'Shipping & Delivery'}</Link></li>
              <li><Link to="/returns" className="hover:text-orea-gold transition-colors duration-500">{'Returns & Exchanges'}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Newsletter & Socials */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h4 className="font-serif text-caption tracking-[0.4em] uppercase text-orea-champagne font-semibold leading-none">JOIN OUR COMMUNITY</h4>
              <div className="flex flex-col gap-2">
                <p className="text-caption tracking-[0.1em] text-orea-cream font-medium leading-relaxed uppercase">
                  Receive $25 off your first order.
                </p>
                <p className="text-caption tracking-[0.1em] text-orea-oatmeal/70 font-light leading-relaxed uppercase">
                  {'Early access to new pieces, private releases, exclusive offers & more.'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex border-b border-orea-champagne/20 pb-3 group focus-within:border-orea-gold transition-colors duration-700">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent text-caption tracking-[0.3em] outline-none flex-1 placeholder:text-orea-taupe text-orea-cream uppercase"
                  aria-label="Email address for newsletter"
                />
                <button className="text-caption tracking-[0.4em] uppercase text-orea-champagne hover:text-orea-gold ml-4 font-semibold transition-colors duration-500">JOIN</button>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-end gap-6 pt-1">
                <a href="#" className="text-orea-oatmeal hover:text-orea-gold transition-colors duration-500" aria-label="Instagram">
                  <Instagram size={16} strokeWidth={1.2} />
                </a>
                <a href="#" className="text-orea-oatmeal hover:text-orea-gold transition-colors duration-500" aria-label="Facebook">
                  <Facebook size={16} strokeWidth={1.2} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-10 border-t border-orea-champagne/10 flex flex-col md:flex-row justify-between items-center text-micro tracking-[0.4em] uppercase gap-6">
          <p className="text-orea-oatmeal/60">{'© ORÉA 2026'}</p>
          <a href="mailto:hello@orea.co.nz" className="text-orea-oatmeal/60 hover:text-orea-cream transition-colors">hello@orea.co.nz</a>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-orea-oatmeal/80">
            <Link to="/terms" className="hover:text-orea-cream transition-colors uppercase">{'Terms & Conditions'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
