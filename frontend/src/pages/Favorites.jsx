import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropertyCard from '../components/PropertyCard';

const MOCK_FAVS = [
  { id: 1, title: 'Luxury Villa', price: 2500000, beds: 5, baths: 4, sqft: 4500, type: 'Villa', status: 'For Sale', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' }
];

export default function Favorites() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-4">
      <Helmet><title>My Favorites | KeyStone Homes</title></Helmet>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-white mb-8">My Favorites</h1>
        {MOCK_FAVS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_FAVS.map(prop => <PropertyCard key={prop.id} property={prop} />)}
          </div>
        ) : (
          <div className="text-center py-24 glassmorphism rounded-3xl">
            <h2 className="text-2xl text-white mb-4">No favorites yet</h2>
            <p className="text-gray-400 mb-8">Start exploring properties and save your favorites!</p>
            <a href="/properties" className="bg-gold-500 text-black px-8 py-3 rounded-full font-bold hover:bg-gold-400">Browse Properties</a>
          </div>
        )}
      </div>
    </div>
  );
}
