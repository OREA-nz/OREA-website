'use client';

import React, { useState } from 'react';
import ContactHero from './ContactHero';
import ContactCards from './ContactCards';
import ContactForm from './ContactForm';

const SignatureMotif = () => (
  <div className="flex items-center justify-center py-20">
    <div className="text-body-sm tracking-widest uppercase text-orea-taupe font-bold opacity-40">ORÉA</div>
  </div>
);

const ContactPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('consultation');

  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactCards onSelectType={setSelectedType} />
      <SignatureMotif />
      <div className="bg-[#F9F6F1] py-16 px-4">
        <ContactForm selectedType={selectedType} />
      </div>
    </main>
  );
};

export default ContactPage;
