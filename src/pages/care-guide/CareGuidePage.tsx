import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Sun, Sparkles, ShieldCheck, RefreshCcw } from 'lucide-react';

const CareGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-orea-cream selection:bg-orea-linen">
      {/* Hero Section */}
      <section className="pt-section pb-16 px-6 lg:px-12 text-center border-b border-orea-linen/40">
        <div className="max-w-container mx-auto">
          <h1 className="font-serif text-h1 font-light tracking-wide mb-8 text-orea-dark">
            Jewellery Care Guide
          </h1>
          <div className="w-16 h-px bg-orea-gold mx-auto mb-12" />
          <p className="text-orea-taupe text-body-lg font-light leading-relaxed max-w-2xl mx-auto">
            Your ORÉA pieces are crafted to last a lifetime.
            <br />
            With proper care and maintenance, they will continue to shine brilliantly for generations to come.
          </p>
        </div>
      </section>

      {/* Daily Care Section */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-caption uppercase tracking-widest text-orea-taupe mb-4 font-bold">Everyday Protection</h2>
            <h3 className="font-serif text-h2 text-orea-dark font-light">Daily Care</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#F9F6F1] p-8 border border-orea-linen">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-[#F9F6F1] border border-orea-linen">
                  <ShieldCheck size={24} className="text-orea-dark" strokeWidth={1.2} />
                </div>
                <h4 className="font-serif text-body-sm uppercase tracking-widest font-bold text-orea-dark">What to Avoid</h4>
              </div>
              <ul className="flex flex-col gap-4 text-orea-taupe text-body-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Remove jewellery before swimming, bathing, or exposure to chlorine and saltwater</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Avoid contact with harsh chemicals, perfumes, hairsprays, and cleaning products</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Take off your jewellery during physical activities and exercise</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Store pieces separately to prevent scratching</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F9F6F1] p-8 border border-orea-linen">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-[#F9F6F1] border border-orea-linen">
                  <Sparkles size={24} className="text-orea-dark" strokeWidth={1.2} />
                </div>
                <h4 className="font-serif text-body-sm uppercase tracking-widest font-bold text-orea-dark">Best Practices</h4>
              </div>
              <ul className="flex flex-col gap-4 text-orea-taupe text-body-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Put your jewellery on last when getting ready (after makeup and perfume)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Remove jewellery first when you get home</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Store in individual soft pouches or lined jewellery boxes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                  <span>Keep pieces away from direct sunlight and extreme temperatures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Section */}
      <section className="py-section px-6 lg:px-12 bg-orea-cream border-y border-orea-linen/40">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-caption uppercase tracking-widest text-orea-taupe mb-4 font-bold">Keep Your Pieces Sparkling</h2>
            <h3 className="font-serif text-h2 text-orea-dark font-light">At-Home Cleaning</h3>
          </div>

          <div className="max-w-content mx-auto flex flex-col gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-orea-cream border border-orea-linen">
                  <Droplet size={24} className="text-orea-dark" strokeWidth={1.2} />
                </div>
                <h4 className="font-serif text-body-sm uppercase tracking-widest font-bold text-orea-dark">Gentle Cleaning Method</h4>
              </div>
              <div className="pl-16 flex flex-col gap-4 text-orea-taupe text-body-sm leading-relaxed">
                <p>Mix a few drops of mild, phosphate-free dish soap with warm (not hot) water in a bowl.</p>
                <p>Soak your jewellery for 10-15 minutes, then gently brush with a soft-bristled brush (like a baby toothbrush) to remove dirt and oils.</p>
                <p>Rinse thoroughly under warm running water (ensure the drain is closed or use a strainer).</p>
                <p>Pat dry with a soft, lint-free cloth and allow to air dry completely before storing.</p>
              </div>
            </div>

            <div className="border-t border-orea-linen pt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-orea-cream border border-orea-linen">
                  <RefreshCcw size={24} className="text-orea-dark" strokeWidth={1.2} />
                </div>
                <h4 className="font-serif text-body-sm uppercase tracking-widest font-bold text-orea-dark">Frequency</h4>
              </div>
              <div className="pl-16 flex flex-col gap-4 text-orea-taupe text-body-sm leading-relaxed">
                <p><span className="font-medium text-orea-dark">Daily wear pieces:</span> Clean every 2-4 weeks</p>
                <p><span className="font-medium text-orea-dark">Occasional wear:</span> Clean before and after wearing</p>
                <p><span className="font-medium text-orea-dark">Rings:</span> Clean more frequently due to regular contact with lotions and oils</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Maintenance */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-caption uppercase tracking-widest text-orea-taupe mb-4 font-bold">Expert Attention</h2>
            <h3 className="font-serif text-h2 text-orea-dark font-light">Professional Maintenance</h3>
          </div>

          <div className="max-w-content mx-auto bg-[#FFFFFF] p-10 md:p-12 border border-orea-linen">
            <p className="text-orea-taupe text-body-sm leading-relaxed mb-8">
              We recommend having your jewellery professionally inspected and cleaned at least once per year. This allows our team to:
            </p>
            <ul className="flex flex-col gap-4 text-orea-taupe text-body-sm leading-relaxed mb-8">
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                <span>Check prong settings and ensure stones are secure</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                <span>Professionally polish and restore shine</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                <span>Address any wear or damage before it becomes serious</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-orea-gold mt-2 flex-shrink-0" />
                <span>Provide deep ultrasonic cleaning for optimal brilliance</span>
              </li>
            </ul>
            <div className="pt-8 border-t border-orea-linen">
              <p className="text-orea-dark text-body-sm font-medium mb-4 uppercase tracking-widest">ORÉA Concierge Service</p>
              <p className="text-orea-taupe text-body-sm leading-relaxed mb-6">
                Consider our Concierge Service for comprehensive care including professional polishing, repairs, and stone resetting with covered shipping for up to three years.
              </p>
              <Link
                to="/concierge"
                className="inline-block text-caption uppercase tracking-widest font-bold text-orea-dark hover:text-orea-gold-a transition-colors border-b border-orea-dark hover:border-orea-gold-a pb-1"
              >
                Learn More About Concierge Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-section px-6 lg:px-12 bg-orea-cream border-t border-orea-linen/40">
        <div className="max-w-content mx-auto text-center">
          <h3 className="font-serif text-h2 text-orea-dark mb-6 font-light">Have Questions About Care?</h3>
          <p className="text-orea-taupe text-body-sm leading-relaxed mb-8">
            Our team is here to help you care for your ORÉA pieces.
            <br />
            Contact us with any questions or to arrange professional servicing.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-orea-dark text-orea-cream text-caption uppercase tracking-widest font-bold hover:bg-orea-taupe transition-all duration-500"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CareGuidePage;
