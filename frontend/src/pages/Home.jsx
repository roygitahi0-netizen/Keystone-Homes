import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { api } from '../api/client';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/properties?limit=3');
        setFeatured(res.data.properties.slice(0, 3));
      } catch (err) {
        console.error('Error fetching featured properties', err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="animate-fadeInUp">
      <Helmet>
        <title>Home | KeyStone Homes</title>
        <meta name="description" content="Find your dream home with KeyStone Homes." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Find Your Dream <span className="text-gold-500">Home</span></h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">Discover the finest luxury real estate tailored to your exceptional lifestyle.</p>
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Featured Listings</h2>
            <p className="text-gray-600 dark:text-gray-400">Hand-picked properties for you</p>
          </div>
          <a href="/properties" className="text-gold-500 hover:text-gold-400 font-semibold hidden md:block">View All Properties &rarr;</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(prop => <PropertyCard key={prop.id} property={prop} />)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold-500 text-black text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-6">Join Our Newsletter</h2>
          <p className="mb-8 opacity-90 text-lg">Stay updated with the latest luxury properties and market insights.</p>
          <form className="flex max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-grow py-3 px-6 rounded-l-full bg-white text-black border-none focus:ring-2 focus:ring-black" required />
            <button type="submit" className="bg-black text-gold-500 px-6 py-3 rounded-r-full font-bold hover:bg-gray-900 transition">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
