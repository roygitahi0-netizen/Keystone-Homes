import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialValues = {}, variant = 'hero' }) => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [filters, setFilters] = useState({
    location: initialValues.location || '',
    propertyType: initialValues.propertyType || '',
    priceRange: initialValues.priceRange || '',
    beds: initialValues.beds || '',
    ...initialValues
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ ...filters, listingType: activeTab.toLowerCase() });
  };

  const isHero = variant === 'hero';

  return (
    <div className={`w-full ${isHero ? 'max-w-5xl mx-auto' : ''}`}>
      {isHero && (
        <div className="flex gap-2 mb-4 justify-center sm:justify-start">
          {['Buy', 'Rent', 'Sell'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-[#C8A45E] text-gray-950 shadow-lg shadow-[#C8A45E]/20'
                  : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 backdrop-blur-md'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <form 
        onSubmit={handleSubmit}
        className={`bg-gray-900/90 backdrop-blur-xl border border-gray-800 p-2 sm:p-4 transition-all duration-300 ${
          isHero ? 'rounded-3xl shadow-2xl shadow-gray-950/50' : 'rounded-2xl'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 items-center">
          
          {/* Location */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-[#C8A45E]/70" />
            </div>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="City, Neighborhood, or ZIP"
              className="w-full bg-gray-950 border border-gray-800 text-gray-100 placeholder-gray-500 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 focus:border-[#C8A45E] transition-all"
            />
          </div>

          {/* Property Type */}
          <div>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="w-full bg-gray-950 border border-gray-800 text-gray-100 rounded-xl py-3.5 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 focus:border-[#C8A45E] transition-all cursor-pointer custom-select"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleChange}
              className="w-full bg-gray-950 border border-gray-800 text-gray-100 rounded-xl py-3.5 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 focus:border-[#C8A45E] transition-all cursor-pointer custom-select"
            >
              <option value="">Price Range</option>
              <option value="0-500000">Up to $500k</option>
              <option value="500000-1000000">$500k - $1M</option>
              <option value="1000000-5000000">$1M - $5M</option>
              <option value="5000000+">$5M+</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#C8A45E] to-[#E2C882] text-gray-950 font-semibold rounded-xl py-3.5 px-6 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C8A45E]/20 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
          >
            <FaSearch />
            <span>Search</span>
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
