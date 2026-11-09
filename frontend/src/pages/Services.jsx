import React from 'react';
import { Helmet } from 'react-helmet-async';

const SERVICES = [
  { title: 'Buying', desc: 'Find your perfect home with our expert guidance and exclusive access to off-market properties.' },
  { title: 'Selling', desc: 'Maximize your property value with our innovative marketing and global network.' },
  { title: 'Property Management', desc: 'Comprehensive management services for peace of mind and optimal ROI.' },
  { title: 'Valuation', desc: 'Accurate and data-driven property appraisals by certified experts.' },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4">
      <Helmet><title>Services | KeyStone Homes</title></Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Comprehensive real estate solutions designed for the modern luxury market.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv, i) => (
            <div key={i} className="glassmorphism p-10 rounded-3xl hover:-translate-y-2 transition duration-300 border-l-4 border-l-gold-500">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{srv.title}</h3>
              <p className="text-gray-400 mb-6">{srv.desc}</p>
              <button className="text-gold-500 font-semibold hover:text-white transition">Learn More &rarr;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
