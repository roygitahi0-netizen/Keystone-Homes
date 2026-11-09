import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const amenitiesList = ['Pool', 'Gym', 'Garden', 'Parking', 'Security', 'Balcony', 'Elevator', 'Air Conditioning'];
const propertyTypes = ['Apartment', 'House', 'Villa', 'Commercial', 'Land', 'Vacation'];

const PropertyFilters = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity) => {
    const currentAmenities = filters.amenities || [];
    if (currentAmenities.includes(amenity)) {
      handleChange('amenities', currentAmenities.filter((a) => a !== amenity));
    } else {
      handleChange('amenities', [...currentAmenities, amenity]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Listing Type */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Listing Type</label>
        <div className="flex bg-gray-950 rounded-lg p-1 border border-gray-800">
          {['Buy', 'Rent'].map((type) => (
            <button
              key={type}
              onClick={() => handleChange('listingType', type.toLowerCase())}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                filters.listingType === type.toLowerCase()
                  ? 'bg-[#C8A45E] text-gray-950'
                  : 'text-gray-400 hover:text-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Keyword</label>
        <input
          type="text"
          value={filters.keyword || ''}
          onChange={(e) => handleChange('keyword', e.target.value)}
          placeholder="Location, neighborhood, zip..."
          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 focus:border-[#C8A45E] transition-colors"
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Property Type</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.propertyType === type.toLowerCase()}
                  onChange={() => handleChange('propertyType', filters.propertyType === type.toLowerCase() ? '' : type.toLowerCase())}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-700 rounded bg-gray-950 checked:border-[#C8A45E] checked:bg-[#C8A45E] transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-gray-950 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-gray-300 group-hover:text-[#C8A45E] transition-colors text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Price Range</label>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Bedrooms</label>
        <div className="flex flex-wrap gap-2">
          {['Any', '1', '2', '3', '4', '5+'].map((num) => (
            <button
              key={num}
              onClick={() => handleChange('beds', num === 'Any' ? '' : num)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                (filters.beds === num || (filters.beds === '' && num === 'Any') || (!filters.beds && num === 'Any'))
                  ? 'bg-[#C8A45E]/10 border-[#C8A45E] text-[#C8A45E]'
                  : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-600'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Bathrooms</label>
        <div className="flex flex-wrap gap-2">
          {['Any', '1', '2', '3', '4+'].map((num) => (
            <button
              key={num}
              onClick={() => handleChange('baths', num === 'Any' ? '' : num)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                (filters.baths === num || (filters.baths === '' && num === 'Any') || (!filters.baths && num === 'Any'))
                  ? 'bg-[#C8A45E]/10 border-[#C8A45E] text-[#C8A45E]'
                  : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-600'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Amenities</label>
        <div className="grid grid-cols-2 gap-3">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded border-gray-700 bg-gray-950 text-[#C8A45E] focus:ring-[#C8A45E] focus:ring-offset-gray-900 transition-colors"
              />
              <span className="text-gray-300 group-hover:text-[#C8A45E] transition-colors text-sm truncate">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Furnished Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Furnished Only</label>
        <button
          onClick={() => handleChange('furnished', !filters.furnished)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 ${
            filters.furnished ? 'bg-[#C8A45E]' : 'bg-gray-800'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              filters.furnished ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-gray-800 flex flex-col gap-3">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) setIsOpen(false);
          }}
          className="w-full bg-[#C8A45E] hover:bg-[#E2C882] text-gray-950 font-medium py-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
        >
          Apply Filters
        </button>
        <button
          onClick={onReset}
          className="w-full text-gray-400 hover:text-white font-medium py-2 transition-colors focus:outline-none"
        >
          Reset All
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden w-full flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 text-gray-100 py-3 rounded-xl mb-6 hover:border-[#C8A45E] transition-colors"
      >
        <FaFilter className="text-[#C8A45E]" />
        Filters
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-6 px-6 shadow-xl h-full border-r border-gray-800 animate-slide-right">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif text-[#C8A45E]">Filters</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2">
                <FaTimes size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-28">
        <h2 className="text-xl font-serif text-[#C8A45E] mb-8">Filter Search</h2>
        <FilterContent />
      </div>
    </>
  );
};

export default PropertyFilters;
