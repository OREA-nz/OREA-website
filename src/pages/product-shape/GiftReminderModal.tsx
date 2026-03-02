'use client';

import React, { useState } from 'react';
import { Product } from './types';

interface GiftReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const GiftReminderModal: React.FC<GiftReminderModalProps> = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recipient: '',
    occasion: 'Anniversary',
    date: '',
    leadTime: '45'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 2500);
    }, 1800);
  };

  const inputClass = "w-full py-4 bg-transparent border-b border-orea-sand/50 text-body-sm focus:outline-none focus:border-orea-champagne transition-all duration-500 placeholder:text-orea-champagne/60 font-light tracking-widest text-orea-dark";
  const labelClass = "text-micro font-bold uppercase tracking-widest text-orea-champagne block mb-1";

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-orea-dark/60 backdrop-blur-sm animate-in fade-in duration-700">
      <div className="bg-orea-cream w-full max-w-4xl rounded-t-lg sm:rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-500 max-h-[95vh] sm:max-h-[90vh]">

        <button onClick={onClose} className="absolute top-8 right-8 z-30 text-orea-champagne hover:text-orea-dark transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-14 bg-orea-cream border-r border-orea-sand/30 flex flex-col overflow-y-auto">
          <div className="mb-10">
            <h3 className="text-h3 font-light font-serif italic text-orea-dark mb-2">Save for Occasion</h3>
            <p className="text-micro font-bold uppercase tracking-widest text-orea-champagne">A considered reminder for a meaningful moment</p>
          </div>

          <form onSubmit={handleSchedule} className="flex-grow flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Your details</label>
                    <input type="text" placeholder="Full Name" className={inputClass} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <input type="email" placeholder="Email Address" className={inputClass} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Occasion</label>
                      <select className={inputClass} value={formData.occasion} onChange={(e) => setFormData({...formData, occasion: e.target.value})}>
                        <option>Anniversary</option>
                        <option>Birthday</option>
                        <option>Proposal</option>
                        <option>Holiday</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Occasion date</label>
                      <input type="date" className={inputClass} value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{"Choose when you'd like to be reminded."}</label>
                    <div className="flex gap-3 pt-2">
                      {['30', '45', '60'].map(days => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setFormData({...formData, leadTime: days})}
                          className={`flex-1 py-3 text-micro font-bold uppercase tracking-widest border transition-all ${
                            formData.leadTime === days ? 'bg-orea-dark text-orea-cream border-orea-dark shadow-sm' : 'border-orea-sand/50 text-orea-champagne hover:border-orea-champagne'
                          }`}
                        >
                          {days} Days Prior
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSaving || isSaved}
                className={`w-full py-6 text-micro font-bold uppercase tracking-widest transition-all duration-700 flex items-center justify-center ${
                  isSaved ? 'bg-orea-dark text-orea-cream' : 'bg-orea-dark text-orea-cream hover:bg-orea-dark'
                }`}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border border-orea-cream/30 border-t-orea-cream rounded-full animate-spin" />
                ) : (
                  isSaved ? 'Reminder Scheduled' : 'Schedule Reminder'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 bg-orea-sand/20 p-10 md:p-16 flex-col items-center justify-center text-center">
          <div className="w-full max-w-xs bg-orea-cream shadow-[0_30px_60px_-15px_rgba(74,63,53,0.1)] p-10 relative flex flex-col items-center gap-8 animate-in slide-in-from-right-8 duration-1000">
            <div className="text-caption font-light tracking-widest text-orea-dark">ORÉA</div>

            <div className="w-12 h-12 rounded-full bg-orea-sand/30 flex items-center justify-center text-orea-champagne">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-serif italic text-body text-orea-taupe leading-relaxed px-2">
                {"We'll gently remind you"} {formData.leadTime} days before your upcoming {formData.occasion.toLowerCase()} - so you have time to prepare.
              </p>

              <div className="h-px bg-orea-sand/30 w-full" />

              <div className="flex flex-col gap-4">
                <p className="text-micro font-bold uppercase tracking-wider text-orea-dark">{product.name}</p>
                <div className="relative group">
                  <div className="bg-orea-cream p-2">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt="Product thumbnail"
                      className="w-24 h-32 object-cover mx-auto grayscale opacity-40 group-hover:opacity-60 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-micro font-bold uppercase tracking-widest text-orea-champagne/60 pt-4">
              With Love, ORÉA
            </div>

            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center -translate-y-1/2 translate-x-1/2">
              <div className="w-px h-12 bg-orea-sand rotate-45 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftReminderModal;
