import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import useProperties from '../hooks/useProperties';
import { PROPERTY_TYPES, LISTING_TYPES, SORT_OPTIONS } from '../utils/constants';

export default function Properties() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const { properties, loading, pagination, filters, setFilters, fetchProperties } = useProperties({
    q: initialQuery,
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] py-12 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300">
      <Helmet><title>Properties | KeyStone Homes</title></Helmet>
      
      <div className="mb-8">
        <SearchBar onSearch={(q) => setFilters({ ...filters, q })} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-3 rounded-lg font-semibold"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar Filters */}
        <aside className={`lg:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="glassmorphism p-6 rounded-2xl">
            <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Filters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Status</label>
                <select 
                  className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="">Any</option>
                  {LISTING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Property Type</label>
                <select 
                  className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">Any</option>
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-1/2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm" onChange={(e) => setFilters({...filters, minPrice: e.target.value})} />
                  <input type="number" placeholder="Max" className="w-1/2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm" onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700 dark:text-gray-400">{properties.length} Properties Found</p>
            <select 
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
            >
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(n => <div key={n} className="h-96 glassmorphism rounded-2xl animate-pulse"></div>)}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {properties.map(prop => <PropertyCard key={prop.id} property={prop} />)}
            </div>
          ) : (
            <div className="text-center py-20 glassmorphism rounded-2xl">
              <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
