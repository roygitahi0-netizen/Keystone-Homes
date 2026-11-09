import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';

const PropertyCard = ({ property, onFavoriteToggle, isFavorited }) => {
  const {
    id,
    title,
    location,
    price,
    image,
    isFeatured,
    isNew,
    status, // e.g. "For Sale", "For Rent"
    beds,
    baths,
    size
  } = property;

  const isRental = status?.toLowerCase().includes('rent');

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C8A45E]/10 transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/properties/${id}`}>
          <img
            src={image || 'https://via.placeholder.com/600x450?text=No+Image'}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isFeatured && (
            <span className="bg-gradient-to-r from-[#C8A45E] to-[#E2C882] text-gray-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
          {isNew && (
            <span className="bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-lg">
              New
            </span>
          )}
          {status && (
            <span className="bg-gray-950/80 text-gray-100 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">
              {status}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle(id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8A45E] ${
            isFavorited ? 'bg-[#C8A45E]/20 text-[#C8A45E]' : 'bg-gray-950/40 text-gray-100 hover:bg-[#C8A45E]/80'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaHeart className={`w-5 h-5 transition-transform ${isFavorited ? 'scale-110' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <div className="text-2xl font-serif text-[#C8A45E] mb-2 flex items-baseline">
            ${price.toLocaleString()}
            {isRental && <span className="text-sm font-sans text-gray-400 ml-1">/mo</span>}
          </div>
          <Link to={`/properties/${id}`}>
            <h3 className="text-lg font-medium text-gray-100 truncate hover:text-[#C8A45E] transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex items-center text-sm text-gray-400 mt-2">
            <FaMapMarkerAlt className="text-[#C8A45E]/70 mr-1.5 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Meta Row */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-800 text-gray-300 text-sm">
          <div className="flex items-center gap-2" title="Bedrooms">
            <FaBed className="text-[#C8A45E]/70" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-800 pl-4" title="Bathrooms">
            <FaBath className="text-[#C8A45E]/70" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-800 pl-4" title="Square Footage">
            <FaRulerCombined className="text-[#C8A45E]/70" />
            <span>{size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
