import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4 text-gray-300">
      <Helmet><title>Privacy Policy | KeyStone Homes</title></Helmet>
      <div className="max-w-4xl mx-auto glassmorphism p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-serif font-bold text-white mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gold-500 mb-2">Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gold-500 mb-2">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, such as to facilitate property searches and connect you with agents.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gold-500 mb-2">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to maintain the security of your personal information.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
