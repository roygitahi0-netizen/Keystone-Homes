import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4 text-gray-300">
      <Helmet><title>Terms and Conditions | KeyStone Homes</title></Helmet>
      <div className="max-w-4xl mx-auto glassmorphism p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-serif font-bold text-white mb-8">Terms and Conditions</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gold-500 mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gold-500 mb-2">2. User Accounts</h2>
            <p>If you create an account on our platform, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gold-500 mb-2">3. Property Listings</h2>
            <p>All property listings are subject to change without notice. We do not guarantee the accuracy of listing information.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
