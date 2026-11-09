import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/properties?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto shadow-2xl">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="City, neighborhood, or address..."
        className="flex-grow rounded-l-full bg-gray-900 border-gray-700 text-white focus:border-gold-500 focus:ring-gold-500 py-4 px-6"
      />
      <button type="submit" className="bg-gold-500 text-black px-8 rounded-r-full font-semibold hover:bg-gold-400 transition flex items-center justify-center">
        <FaSearch />
      </button>
    </form>
  );
}
