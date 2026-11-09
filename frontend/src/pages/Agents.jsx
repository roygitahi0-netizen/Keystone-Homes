import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const MOCK_AGENTS = [
  { id: 1, name: 'Sarah Jenkins', role: 'Luxury Property Specialist', rating: 4.9, deals: 124, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Michael Chen', role: 'Commercial Real Estate', rating: 4.8, deals: 89, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Elena Rodriguez', role: 'Residential Expert', rating: 5.0, deals: 210, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
];

export default function Agents() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-20 px-4">
      <Helmet><title>Our Agents | KeyStone Homes</title></Helmet>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Meet Our Experts</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Work with the industry's best professionals who are dedicated to helping you find your dream home.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_AGENTS.map(agent => (
            <div key={agent.id} className="glassmorphism rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-1">{agent.name}</h3>
                <p className="text-gold-500 mb-4">{agent.role}</p>
                <div className="flex justify-center gap-6 text-gray-400 mb-6 border-t border-gray-800 pt-4">
                  <div><strong className="text-white block">{agent.rating}/5</strong> Rating</div>
                  <div><strong className="text-white block">{agent.deals}</strong> Deals</div>
                </div>
                <Link to={`/agents/${agent.id}`} className="inline-block w-full border border-gold-500 text-gold-500 py-2 rounded-full font-semibold hover:bg-gold-500 hover:text-black transition">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
