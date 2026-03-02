'use client';

import React, { useState } from 'react';
import { Product } from './types';

interface SendAHintModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const SendAHintModal: React.FC<SendAHintModalProps> = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    receiverName: '',
    receiverEmail: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1800);
  };

  const inputClass = "w-full py-4 bg-transparent border-b border-orea-sand/50 text-body-sm focus:outline-none focus:border-orea-champagne transition-all duration-500 placeholder:text-orea-champagne/60 font-light tracking-widest text-orea-dark";

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-orea-dark/60 backdrop-blur-sm animate-in fade-in duration-700">
      <div className="bg-orea-cream w-full max-w-5xl rounded-t-lg sm:rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-500 max-h-[95vh] sm:max-h-[90vh] md:min-h-[600px]">

        <button onClick={onClose} className="absolute top-8 right-8 z-30 text-orea-champagne hover:text-orea-dark transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {isSent ? (
          <div className="w-full flex flex-col items-center justify-center p-12 md:p-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-12 relative">
              <svg className="w-20 h-20 text-orea-sand mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4V6M12 18V20M6 12H4M20 12H18M17.657 6.343L16.243 7.757M7.757 16.243L6.343 17.657M17.657 17.657L16.243 16.243M7.757 7.757L6.343 6.343" strokeWidth="0.5" strokeLinecap="round"/><circle cx="12" cy="12" r="3" strokeWidth="0.5"/></svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-orea-dark animate-in zoom-in duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>

            <div className="max-w-md flex flex-col gap-6">
              <h3 className="text-h2 font-light font-serif italic text-orea-dark">Sent with Care</h3>
              <p className="text-body text-orea-taupe font-light leading-relaxed font-serif italic">
                A thoughtful gesture for a beautiful future. Your hint to {formData.receiverName || 'them'} has been shared.
              </p>

              <div className="pt-12 flex flex-col items-center gap-8">
                <div className="h-px w-12 bg-orea-sand" />
                <div className="flex flex-col md:flex-row gap-8">
                  <button
                    onClick={onClose}
                    className="text-micro font-bold uppercase tracking-widest text-orea-dark border-b border-orea-dark pb-2 hover:text-orea-taupe hover:border-orea-taupe transition-all"
                  >
                    Return to the Piece
                  </button>
                  <button
                    onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('orea-open-concierge')); }}
                    className="text-micro font-bold uppercase tracking-widest text-orea-taupe hover:text-orea-dark transition-all"
                  >
                    Discuss Bespoke Sourcing
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full md:w-5/12 p-6 sm:p-10 md:p-14 bg-orea-cream border-r border-orea-sand/30 flex flex-col overflow-y-auto">
              <div className="mb-12">
                <h3 className="text-h3 font-light font-serif italic text-orea-dark mb-2">Send a Hint</h3>
                <p className="text-micro font-bold uppercase tracking-widest text-orea-champagne">Share your vision with someone special</p>
              </div>

              <form onSubmit={handleSend} className="flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <p className="text-micro font-bold uppercase tracking-widest text-orea-champagne">From</p>
                      <input type="text" placeholder="Your Name" className={inputClass} value={formData.senderName} onChange={(e) => setFormData({...formData, senderName: e.target.value})} required />
                      <input type="email" placeholder="Your Email Address" className={inputClass} value={formData.senderEmail} onChange={(e) => setFormData({...formData, senderEmail: e.target.value})} required />
                    </div>

                    <div className="py-2 flex items-center">
                      <div className="h-px bg-orea-sand/50 flex-grow" />
                      <div className="mx-4 text-micro font-bold uppercase tracking-widest text-orea-sand">Recipient</div>
                      <div className="h-px bg-orea-sand/50 flex-grow" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-micro font-bold uppercase tracking-widest text-orea-champagne">To</p>
                      <input type="text" placeholder="Their Name" className={inputClass} value={formData.receiverName} onChange={(e) => setFormData({...formData, receiverName: e.target.value})} required />
                      <input type="email" placeholder="Their Email Address" className={inputClass} value={formData.receiverEmail} onChange={(e) => setFormData({...formData, receiverEmail: e.target.value})} required />
                    </div>

                    <div className="pt-4">
                      <textarea
                        placeholder="Write a personal message (optional)..."
                        rows={2}
                        className={`${inputClass} border-orea-sand/30 focus:border-orea-champagne resize-none italic font-serif`}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col gap-6">
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-6 text-micro font-bold uppercase tracking-widest transition-all duration-700 flex items-center justify-center bg-orea-dark text-orea-cream hover:bg-orea-dark ${isSending ? 'opacity-90' : 'opacity-100'}`}
                  >
                    {isSending ? (
                      <div className="w-4 h-4 border border-orea-cream/30 border-t-orea-cream rounded-full animate-spin" />
                    ) : (
                      'Send Hint'
                    )}
                  </button>
                  <div className="text-micro font-bold uppercase tracking-wider text-orea-champagne/60 text-center">
                    {"We'll only send this once, unless they choose to hear from us."}
                  </div>
                </div>
              </form>
            </div>

            <div className="hidden md:flex w-full md:w-7/12 bg-orea-sand/20 p-10 md:p-20 items-center justify-center relative">
              <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                <svg className="w-64 h-64 text-orea-dark" viewBox="0 0 24 24" fill="none"><path d="M12 4V6M12 18V20M6 12H4M20 12H18M17.657 6.343L16.243 7.757M7.757 16.243L6.343 17.657M17.657 17.657L16.243 16.243M7.757 7.757L6.343 6.343" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"/></svg>
              </div>

              <div className="w-full max-w-sm bg-orea-cream shadow-[0_30px_60px_-15px_rgba(74,63,53,0.08)] p-12 relative flex flex-col items-center animate-in slide-in-from-right-12 duration-1000">
                <div className="mb-10 text-center">
                  <p className="text-caption font-light tracking-widest text-orea-dark mb-1">ORÉA</p>
                  <div className="w-4 h-px bg-orea-sand mx-auto" />
                </div>

                <div className="flex flex-col gap-8 text-center w-full">
                  <div className="flex flex-col gap-4">
                    <p className="font-serif italic text-h5 text-orea-dark truncate px-4">Dear {formData.receiverName || '[Recipient Name]'}</p>
                    <div className="px-2">
                      <p className="font-serif italic text-body text-orea-taupe leading-relaxed">
                        We thought you might like to see something that{"'"}s been on {formData.senderName || "[Your Name]"}{"'"}s mind lately.
                      </p>
                    </div>
                  </div>

                  <div className="relative group mx-auto w-fit py-2">
                    <div className="bg-orea-cream p-2 shadow-sm">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt="Hint Product"
                        className="w-48 h-60 object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 pt-2">
                    <div>
                      <h4 className="font-serif text-micro font-bold uppercase tracking-widest text-orea-dark mb-1">{product.name}</h4>
                    </div>

                    {formData.message && (
                      <div className="pt-4 border-t border-orea-sand/30">
                        <p className="font-serif italic text-body-sm text-orea-taupe line-clamp-3">{'"'}{formData.message}{'"'}</p>
                      </div>
                    )}

                    <div className="pt-4">
                      <p className="font-serif italic text-caption text-orea-champagne mb-2">With love,</p>
                      <p className="text-micro font-bold uppercase tracking-widest text-orea-dark">ORÉA</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orea-sand/20 border border-orea-cream shadow-inner flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-orea-champagne" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SendAHintModal;
