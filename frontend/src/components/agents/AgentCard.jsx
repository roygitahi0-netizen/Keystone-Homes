import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const AgentCard = ({ agent }) => {
  const { id, name, avatar, specialization, rating, dealsClosed, yearsExperience } = agent;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-2xl hover:border-[#C8A45E]/30 transition-all duration-300">
      
      {/* Avatar */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-[#C8A45E] to-[#E2C882] relative z-10 group-hover:scale-105 transition-transform duration-300">
          <img 
            src={avatar || 'https://via.placeholder.com/150'} 
            alt={name} 
            className="w-full h-full object-cover rounded-full border-4 border-gray-900"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-[#C8A45E] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
      </div>

      {/* Info */}
      <Link to={`/agents/${id}`} className="block mb-1">
        <h3 className="text-xl font-serif text-gray-100 group-hover:text-[#C8A45E] transition-colors">{name}</h3>
      </Link>
      <p className="text-[#C8A45E] text-sm uppercase tracking-wider font-medium mb-4">{specialization}</p>

      {/* Stats Row */}
      <div className="w-full grid grid-cols-3 gap-4 border-t border-b border-gray-800 py-4 mb-6">
        <div className="flex flex-col items-center">
          <span className="flex items-center text-gray-100 font-semibold">
            {rating} <FaStar className="text-[#C8A45E] ml-1 w-3 h-3" />
          </span>
          <span className="text-xs text-gray-500 mt-1 uppercase">Rating</span>
        </div>
        <div className="flex flex-col items-center border-l border-r border-gray-800">
          <span className="text-gray-100 font-semibold">{dealsClosed}</span>
          <span className="text-xs text-gray-500 mt-1 uppercase">Deals</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-100 font-semibold">{yearsExperience}</span>
          <span className="text-xs text-gray-500 mt-1 uppercase">Years</span>
        </div>
      </div>

      {/* Action */}
      <Link 
        to={`/agents/${id}`}
        className="w-full py-2.5 rounded-full border border-[#C8A45E] text-[#C8A45E] font-medium hover:bg-[#C8A45E] hover:text-gray-950 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
      >
        Contact Agent
      </Link>
    </div>
  );
};

export default AgentCard;
