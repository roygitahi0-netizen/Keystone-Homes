import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-center px-4">
      <Helmet><title>Page Not Found | KeyStone Homes</title></Helmet>
      <h1 className="text-9xl font-serif font-bold text-gold-500 mb-4">404</h1>
      <h2 className="text-3xl font-serif text-white mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="bg-gold-500 text-black px-8 py-3 rounded-full font-bold hover:bg-gold-400 transition">
        Go Back Home
      </Link>
    </div>
  );
}
