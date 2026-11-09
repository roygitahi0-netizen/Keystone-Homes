import React from 'react';
import { FaTimes, FaCheck, FaMinus } from 'react-icons/fa';

const CompareModal = ({ properties, isOpen, onClose }) => {
  if (!isOpen || !properties || properties.length === 0) return null;

  // Helpers to find min/max for highlighting best values
  const prices = properties.map(p => p.price);
  const minPrice = Math.min(...prices);
  
  const beds = properties.map(p => p.beds || 0);
  const maxBeds = Math.max(...beds);
  
  const sizes = properties.map(p => {
    // Assuming size is a string like "2,500 sqft", extract number
    const num = parseInt(p.size?.replace(/[^0-9]/g, '')) || 0;
    return num;
  });
  const maxSize = Math.max(...sizes);

  const renderRow = (label, key, customRender, highlightCondition) => (
    <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td className="p-4 text-sm font-medium text-gray-400 bg-gray-950 sticky left-0 z-10 w-1/4 min-w-[120px]">
        {label}
      </td>
      {properties.map((prop, idx) => {
        const val = key ? prop[key] : null;
        const isHighlighted = highlightCondition ? highlightCondition(prop) : false;
        return (
          <td key={idx} className={`p-4 text-sm ${isHighlighted ? 'text-[#C8A45E] font-semibold' : 'text-gray-200'} min-w-[200px]`}>
            {customRender ? customRender(prop) : val || '-'}
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-950">
          <h2 className="text-2xl font-serif text-[#C8A45E]">Compare Properties</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-gray-950 sticky top-0 left-0 z-20 border-b border-gray-800"></th>
                {properties.map((prop, idx) => (
                  <th key={idx} className="p-4 bg-gray-950 sticky top-0 z-10 border-b border-gray-800 min-w-[250px]">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-medium text-white truncate" title={prop.title}>{prop.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{prop.location}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderRow('Price', 'price', (p) => `$${p.price.toLocaleString()}`, (p) => p.price === minPrice)}
              {renderRow('Type', 'propertyType')}
              {renderRow('Status', 'status')}
              {renderRow('Bedrooms', 'beds', null, (p) => p.beds === maxBeds)}
              {renderRow('Bathrooms', 'baths')}
              {renderRow('Size', 'size', null, (p) => {
                const num = parseInt(p.size?.replace(/[^0-9]/g, '')) || 0;
                return num === maxSize && num > 0;
              })}
              {renderRow('Year Built', 'yearBuilt')}
              {renderRow('Parking', 'parking', (p) => p.parking ? <FaCheck className="text-green-500" /> : <FaMinus className="text-gray-600" />)}
              {renderRow('Furnished', 'furnished', (p) => p.furnished ? <FaCheck className="text-green-500" /> : <FaMinus className="text-gray-600" />)}
              {renderRow('Price/Sqft', null, (p) => {
                const sizeNum = parseInt(p.size?.replace(/[^0-9]/g, '')) || 0;
                if (!sizeNum) return '-';
                const pps = Math.round(p.price / sizeNum);
                return `$${pps}`;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
