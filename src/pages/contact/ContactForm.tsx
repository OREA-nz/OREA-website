'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ContactFormProps {
  selectedType?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedType = 'consultation' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [enquiryType, setEnquiryType] = useState(selectedType);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (selectedType) {
      setEnquiryType(selectedType);
    }
  }, [selectedType]);

  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitting(true);
  };

  const labelStyles = "text-caption uppercase tracking-widest font-bold text-orea-dark ml-1 mb-4 block";
  const inputStyles = "w-full bg-[#FFFFFF] border border-orea-linen px-6 py-5 rounded-sm focus:outline-none focus:border-orea-champagne focus:ring-0 transition-all duration-500 placeholder:text-orea-taupe/40 text-orea-dark text-body font-normal shadow-sm";

  if (isSent) {
    return (
      <div className="max-w-xl mx-auto text-center py-section" aria-live="polite">
        <h3 className="font-serif text-h2 mb-4 font-light text-orea-dark uppercase tracking-widest">Thank You</h3>
        <p className="text-body-sm uppercase tracking-widest text-orea-taupe max-w-xs mx-auto leading-loose font-medium block">
          We aim to respond within 1-2 business days.
        </p>
        <button
          onClick={() => setIsSent(false)}
          className="mt-14 text-caption uppercase tracking-widest border-b border-orea-linen text-orea-taupe font-bold hover:text-orea-dark transition-colors duration-500"
        >
          Return to enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="https://formsubmit.co/hello@orea.co.nz"
      id="enquiry-form"
      acceptCharset="UTF-8"
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto flex flex-col gap-12"
    >
      <input type="hidden" name="_subject" value="New ORÉA Enquiry" />
      <input type="hidden" name="_captcha" value="false" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <label htmlFor="ContactFormName" className={labelStyles}>Full Name</label>
          <input
            id="ContactFormName"
            type="text"
            name="contact[name]"
            required
            autoComplete="name"
            className={inputStyles}
            placeholder="Alexandra Taylor"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ContactFormEmail" className={labelStyles}>Email Address</label>
          <input
            id="ContactFormEmail"
            type="email"
            name="contact[email]"
            required
            autoComplete="email"
            className={inputStyles}
            placeholder="alexandra@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <label htmlFor="ContactFormPhone" className={labelStyles}>Phone (Optional)</label>
          <input
            id="ContactFormPhone"
            type="tel"
            name="contact[phone]"
            autoComplete="tel"
            className={inputStyles}
            placeholder="+64 21 000 0000"
          />
        </div>
        <div
          id="enquiry-type-section"
          className="flex flex-col -m-4 p-4 rounded-lg transition-all duration-700"
        >
          <label htmlFor="ContactFormEnquiryType" className={labelStyles}>Enquiry Type</label>
          <div className="relative">
            <select
              id="ContactFormEnquiryType"
              name="contact[enquiry_type]"
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value)}
              className={`${inputStyles} appearance-none cursor-pointer pr-10`}
            >
              <option value="consultation">Consultation</option>
              <option value="bespoke">Bespoke</option>
              <option value="order">Order Support</option>
              <option value="general">General Enquiry</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-orea-champagne">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="ContactFormMessage" className={labelStyles}>Message</label>
        <textarea
          id="ContactFormMessage"
          name="contact[body]"
          rows={6}
          required
          className={`${inputStyles} resize-none leading-relaxed`}
          placeholder="How can we assist you?"
        />
      </div>

      <div className="text-center pt-10">
        <button
          disabled={isSubmitting}
          type="submit"
          className="group relative px-28 py-10 bg-orea-dark text-orea-cream text-caption uppercase tracking-widest font-bold rounded-lg transition-all duration-700 ease-in-out w-full md:w-auto overflow-hidden shadow-xl hover:bg-orea-taupe active:scale-[0.99]"
        >
          <span className="relative z-20">
            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
          </span>
          <div className="absolute inset-0 z-0 bg-orea-dark group-hover:bg-orea-taupe transition-colors duration-700" />
        </button>

        <p className="mt-14 text-caption uppercase tracking-widest text-orea-taupe/80 font-bold">
          We aim to respond within 1-2 business days.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
