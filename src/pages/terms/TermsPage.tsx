import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-orea-linen selection:text-orea-dark py-20">
      <div className="px-6 md:px-12 max-w-container mx-auto">
        <div className="text-center mb-20">
          <h1 className="font-serif text-h1 font-light leading-tight text-orea-dark">
            Terms & Conditions
          </h1>
          <div className="h-px w-24 bg-orea-linen mx-auto mt-12" />
        </div>

        <div className="max-w-content mx-auto flex flex-col gap-12 text-orea-dark font-sans font-light leading-relaxed text-body-lg">
          <p>
            These Terms & Conditions apply to your use of the ORÉA website and the purchase of products from ORÉA ("we", "us", "our"). By accessing this website or placing an order, you agree to be bound by these Terms and our related policies, including our Privacy Policy and Returns & Refunds Policy. If you do not agree, you should not use this website.
          </p>

          <p>
            You may use this website for lawful purposes only. You must not misuse the website, interfere with its operation, attempt unauthorised access, or use it in breach of any applicable law.
          </p>

          <p>
            We make reasonable efforts to ensure that product descriptions, images, pricing, and availability are accurate. However, product appearance may vary depending on your device or screen settings, and all information is subject to change without notice.
          </p>

          <p>
            When you place an order, you are making an offer to purchase. An order is not accepted until payment is received and we confirm acceptance. We reserve the right to decline or cancel any order, including in the event of pricing or product errors. If an order is cancelled, any payment received will be refunded. Payments are processed securely via Shopify and its payment service providers.
          </p>

          <p>
            Delivery timeframes are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs processing, or events outside our reasonable control. Risk in the goods passes to you once the order has been delivered to the address provided at checkout.
          </p>

          <p>
            Returns, refunds, and exchanges are governed by our Returns & Refunds Policy. Nothing in these Terms limits or excludes any rights you may have under the Consumer Guarantees Act 1993 (New Zealand).
          </p>

          <p>
            All content on this website, including text, images, logos, designs, and graphics, is owned by ORÉA or its licensors and is protected by intellectual property laws. You may not copy, reproduce, modify, distribute, or otherwise use any content without our prior written consent.
          </p>

          <p>
            To the extent permitted by law, ORÉA is not liable for any indirect or consequential loss arising from your use of this website or the purchase of products. Nothing in these Terms excludes or limits liability where it cannot be excluded under New Zealand law.
          </p>

          <p>
            Your personal information is handled in accordance with our Privacy Policy.
          </p>

          <p>
            We may update these Terms from time to time. The current version will always be available on this website, and continued use of the website constitutes acceptance of any updated Terms.
          </p>

          <p>
            These Terms are governed by and construed in accordance with the laws of New Zealand, and the courts of New Zealand have exclusive jurisdiction.
          </p>

          <p className="pt-8 border-t border-orea-linen font-medium text-orea-taupe text-body-sm text-center">
            If you have any questions about these Terms, please contact ORÉA at <a href="mailto:hello@orea.co.nz" className="underline underline-offset-4 hover:text-orea-dark transition-colors">hello@orea.co.nz</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
