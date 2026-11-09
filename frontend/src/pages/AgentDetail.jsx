import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function AgentDetail() {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-20 px-4">
      <Helmet><title>Agent Profile | KeyStone Homes</title></Helmet>
      <div className="max-w-4xl mx-auto glassmorphism p-8 md:p-12 rounded-3xl">
        <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Agent" className="w-48 h-48 rounded-full object-cover border-4 border-gold-500" />
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Sarah Jenkins</h1>
            <p className="text-xl text-gold-500 mb-4">Luxury Property Specialist</p>
            <p className="text-gray-400 mb-6 max-w-xl">Sarah has over 15 years of experience in the luxury real estate market, specializing in coastal estates and modern penthouses. Her dedication to client satisfaction has made her top producer.</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="bg-gold-500 text-black px-8 py-3 rounded-full font-bold hover:bg-gold-400 transition">Contact Me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
