import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  return (
    <div className="glassmorphism rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <img src={(property.images && property.images.length > 0) ? property.images[0] : property.image || 'https://via.placeholder.com/800x600'} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-gold-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          {property.status}
        </div>
        <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
          {property.property_type || property.type}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-2xl font-bold text-gold-500 mb-4">{formatCurrency(property.price)}</p>
        <div className="flex gap-4 text-gray-600 dark:text-gray-400 text-sm mb-6 border-t border-gray-200 dark:border-gray-800 pt-4">
          <span className="flex items-center gap-2"><FaBed className="text-gold-500" /> {property.bedrooms || property.beds} Beds</span>
          <span className="flex items-center gap-2"><FaBath className="text-gold-500" /> {property.bathrooms || property.baths} Baths</span>
          <span className="flex items-center gap-2"><FaRulerCombined className="text-gold-500" /> {property.size_sqft || property.sqft} sqft</span>
        </div>
        <Link to={`/properties/${property.id}`} className="block w-full text-center border border-gold-500 text-gold-500 py-2 rounded-full hover:bg-gold-500 hover:text-black transition font-semibold">
          View Details
        </Link>
      </div>
    </div>
  );
}
