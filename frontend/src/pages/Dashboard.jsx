import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] py-12 px-4 transition-colors duration-300">
      <Helmet><title>Dashboard | KeyStone Homes</title></Helmet>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Welcome, {user?.firstName || 'User'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glassmorphism p-6 rounded-2xl">
            <h3 className="text-gray-700 dark:text-gray-400 mb-2">Saved Properties</h3>
            <p className="text-4xl font-bold text-gold-500">12</p>
          </div>
          <div className="glassmorphism p-6 rounded-2xl">
            <h3 className="text-gray-700 dark:text-gray-400 mb-2">Scheduled Viewings</h3>
            <p className="text-4xl font-bold text-gold-500">3</p>
          </div>
          <div className="glassmorphism p-6 rounded-2xl">
            <h3 className="text-gray-700 dark:text-gray-400 mb-2">Inquiries Sent</h3>
            <p className="text-4xl font-bold text-gold-500">5</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glassmorphism p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            <ul className="space-y-4">
              <li className="text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-4">You favorited "Majestic Modern Villa"</li>
              <li className="text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-4">Viewing scheduled for "Seaside Estate"</li>
              <li className="text-gray-700 dark:text-gray-400">Inquiry sent to Agent Sarah Jenkins</li>
            </ul>
          </div>
          <div className="glassmorphism p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">Quick Links</h2>
            <Link to="/favorites" className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-full mb-4 hover:bg-gray-300 dark:hover:bg-gray-700 transition">My Favorites</Link>
            <Link to="/properties" className="w-full bg-gold-500 text-black py-3 rounded-full font-bold hover:bg-gold-400 transition">Browse Properties</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
