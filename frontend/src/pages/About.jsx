import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300">
      <Helmet><title>About Us | KeyStone Homes</title></Helmet>
      
      {/* Header */}
      <section className="py-24 px-4 text-center bg-gray-900/50">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Redefining Luxury Real Estate</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-400">At KeyStone Homes, we provide an unparalleled real estate experience, connecting discerning clients with the world's most exceptional properties.</p>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Our Story</h2>
          <p className="mb-4">Founded in 2010, KeyStone Homes began with a vision to revolutionize the luxury real estate market by combining cutting-edge technology with personalized, white-glove service.</p>
          <p>Over the past decade, we have facilitated billions in real estate transactions, earning a reputation for integrity, discretion, and extraordinary results.</p>
        </div>
        <div className="rounded-2xl overflow-hidden h-96">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" alt="Office" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {['Integrity', 'Excellence', 'Innovation', 'Trust'].map((value, i) => (
              <div key={i} className="glassmorphism p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gold-500 mb-4">{value}</h3>
                <p className="text-sm">We hold ourselves to the highest standards of professional and ethical conduct.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
