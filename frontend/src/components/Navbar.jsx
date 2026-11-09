import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import ThemeToggle from './ui/ThemeToggle';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  
  return (
    <nav className="fixed w-full top-0 z-50 glassmorphism border-b-0 py-4 px-6 flex justify-between items-center transition-all duration-300">
      <Link to="/" className="text-2xl font-serif font-bold text-gold-500 flex items-center gap-2">
        <FaHome /> KeyStone Homes
      </Link>
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/properties" className="hover:text-gold-400 transition">Properties</Link>
        <Link to="/agents" className="hover:text-gold-400 transition">Agents</Link>
        <Link to="/about" className="hover:text-gold-400 transition">About</Link>
        <Link to="/services" className="hover:text-gold-400 transition">Services</Link>
        <Link to="/contact" className="hover:text-gold-400 transition">Contact</Link>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-sm hover:text-gold-400 flex items-center gap-2">
              <FaUser /> {user?.firstName || 'Dashboard'}
            </Link>
            <button onClick={logout} className="text-sm hover:text-red-400 flex items-center gap-2">
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gold-400">Login</Link>
            <Link to="/signup" className="bg-gold-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-gold-400 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
