import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages } from 'react-icons/fa';

const PropertyGallery = ({ images, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleNext, handlePrevious]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[21/9] bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 flex flex-col items-center justify-center">
        <FaImages className="w-16 h-16 text-gray-800 mb-4" />
        <p className="text-gray-500 font-medium">No images available</p>
      </div>
    );
  }

  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);
  const remainingCount = images.length - 5;

  return (
    <>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden group">
        <div 
          className="md:col-span-3 h-full relative cursor-pointer overflow-hidden"
          onClick={() => { setCurrentIndex(0); setIsOpen(true); }}
        >
          <img 
            src={mainImage} 
            alt={`${title} main`} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gray-950/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        
        <div className="hidden md:grid grid-rows-4 gap-4 h-full">
          {thumbnails.map((img, idx) => (
            <div 
              key={idx} 
              className="relative h-full cursor-pointer overflow-hidden rounded-r-lg"
              onClick={() => { setCurrentIndex(idx + 1); setIsOpen(true); }}
            >
              <img 
                src={img} 
                alt={`${title} thumbnail ${idx + 1}`} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" 
              />
              {idx === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-gray-950/70 flex items-center justify-center hover:bg-gray-950/60 transition-colors">
                  <span className="text-white font-medium text-lg">+{remainingCount} Photos</span>
                </div>
              )}
            </div>
          ))}
          {/* Fill empty spots if less than 5 images total */}
          {[...Array(Math.max(0, 4 - thumbnails.length))].map((_, idx) => (
            <div key={`empty-${idx}`} className="bg-gray-900 rounded-r-lg" />
          ))}
        </div>

        {/* Mobile View All Button */}
        <button 
          onClick={() => { setCurrentIndex(0); setIsOpen(true); }}
          className="md:hidden absolute bottom-4 right-4 bg-gray-950/80 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 flex items-center gap-2"
        >
          <FaImages /> 1/{images.length}
        </button>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 text-gray-100 z-10 absolute top-0 w-full bg-gradient-to-b from-gray-950/80 to-transparent">
            <div className="text-sm font-medium">
              <span className="text-[#C8A45E]">{currentIndex + 1}</span> / {images.length}
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image View */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 md:left-8 p-3 bg-gray-950/50 hover:bg-[#C8A45E] hover:text-gray-950 text-white rounded-full transition-all backdrop-blur"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>

            <img 
              src={images[currentIndex]} 
              alt={`${title} view ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 p-3 bg-gray-950/50 hover:bg-[#C8A45E] hover:text-gray-950 text-white rounded-full transition-all backdrop-blur"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails Strip */}
          <div className="h-24 md:h-32 bg-gray-950 border-t border-gray-900 p-4 overflow-x-auto custom-scrollbar flex items-center justify-center gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-full flex-shrink-0 aspect-video rounded-md overflow-hidden transition-all ${
                  currentIndex === idx ? 'ring-2 ring-[#C8A45E] opacity-100 scale-105' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
