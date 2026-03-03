import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:block p-1 hover:text-orea-gold-a transition-colors duration-500"
        aria-label="Account"
      >
        <User size={18} strokeWidth={1.2} />
      </button>

      {/* Dropdown */}
      <div className={`absolute top-full right-0 mt-4 w-56 bg-orea-cream border border-orea-champagne/15 shadow-xl transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        {user ? (
          <div className="flex flex-col">
            <div className="px-6 py-5 border-b border-orea-champagne/10">
              <p className="text-micro font-bold uppercase tracking-widest text-orea-taupe">Welcome back</p>
              <p className="text-body-sm font-light text-orea-dark mt-1 font-serif">{user.firstName}</p>
            </div>
            <div className="flex flex-col py-2">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-micro font-bold uppercase tracking-widest text-orea-dark hover:bg-orea-linen transition-colors"
              >
                My Account
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-micro font-bold uppercase tracking-widest text-orea-dark hover:bg-orea-linen transition-colors"
              >
                Order History
              </Link>
            </div>
            <div className="border-t border-orea-champagne/10 py-2">
              <button
                onClick={() => { signOut(); setIsOpen(false); }}
                className="w-full px-6 py-3 text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark hover:bg-orea-linen transition-colors flex items-center gap-2"
              >
                <LogOut size={14} strokeWidth={1.2} />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col py-2">
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-micro font-bold uppercase tracking-widest text-orea-dark hover:bg-orea-linen transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark hover:bg-orea-linen transition-colors"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
