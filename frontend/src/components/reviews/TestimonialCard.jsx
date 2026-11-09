import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ review }) => {
  const { authorName, authorRole, content, rating, initials } = review;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl hover:border-gray-700 transition-all duration-300 flex flex-col h-full">
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-[#C8A45E]' : 'text-gray-700'}`} 
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 mb-8">
        <p className="text-gray-300 italic leading-relaxed">"{content}"</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 border-t border-gray-800 pt-6 mt-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A45E] to-[#E2C882] flex items-center justify-center text-gray-950 font-bold text-lg shadow-inner">
          {initials || authorName.charAt(0)}
        </div>
        <div>
          <h4 className="text-gray-100 font-medium">{authorName}</h4>
          <p className="text-[#C8A45E] text-sm">{authorRole || 'Client'}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
