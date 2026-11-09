import React from 'react';
import PropertyCard from './PropertyCard';
import { FaHouseDamage } from 'react-icons/fa';

const PropertyGrid = ({ properties, loading, onFavoriteToggle, favorites }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-gray-800/50" />
            <div className="p-6 space-y-4">
              <div className="h-8 bg-gray-800/50 rounded-md w-1/3" />
              <div className="h-6 bg-gray-800/50 rounded-md w-3/4" />
              <div className="h-4 bg-gray-800/50 rounded-md w-1/2" />
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                <div className="h-4 bg-gray-800/50 rounded-md w-full" />
                <div className="h-4 bg-gray-800/50 rounded-md w-full" />
                <div className="h-4 bg-gray-800/50 rounded-md w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-900/30 border border-gray-800 rounded-2xl min-h-[400px]">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <FaHouseDamage className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-serif text-[#C8A45E] mb-2">No Properties Found</h3>
        <p className="text-gray-400 max-w-md">
          We couldn't find any properties matching your current criteria. Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorited={favorites?.includes(property.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
