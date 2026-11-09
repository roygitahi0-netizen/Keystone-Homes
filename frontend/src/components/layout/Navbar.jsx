import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth'; // Assumes useAuth hook exists

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Agents', path: '/agents' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/80 backdrop-blur-xl shadow-lg border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#C8A45E] to-[#E2C882] rounded-sm transform rotate-45 group-hover:rotate-90 transition-all duration-500 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-950 transform -rotate-45" />
            </div>
            <span className="text-2xl font-serif text-[#C8A45E]">KeyStone</span>
            <span className="text-2xl font-sans text-gray-100 font-light tracking-wide">Homes</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 relative py-2 ${
                    isActive ? 'text-[#C8A45E]' : 'text-gray-100 hover:text-[#C8A45E]'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C8A45E] after:transform after:scale-x-0 after:transition-transform after:duration-300 ${
                    isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Auth / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 text-gray-100 hover:text-[#C8A45E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 rounded-full p-1"
                  aria-label="User menu"
                >
                  <FaUserCircle className="w-8 h-8" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl py-2 overflow-hidden">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-800 hover:text-[#C8A45E] transition-colors">Dashboard</Link>
                    <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-800 hover:text-[#C8A45E] transition-colors">Favorites</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition-colors">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-100 hover:text-[#C8A45E] text-sm font-medium transition-colors">Sign In</Link>
                <Link to="/register" className="bg-[#C8A45E] hover:bg-[#E2C882] text-gray-950 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-100 hover:text-[#C8A45E] focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-gray-950/95 backdrop-blur-3xl border-t border-gray-800 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-4 text-base font-medium rounded-xl transition-colors ${
                    isActive ? 'bg-gray-900 text-[#C8A45E]' : 'text-gray-100 hover:bg-gray-900 hover:text-[#C8A45E]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-6 mt-6 border-t border-gray-800 flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-[#C8A45E] hover:bg-gray-900 rounded-xl">Dashboard</Link>
                  <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-[#C8A45E] hover:bg-gray-900 rounded-xl">Favorites</Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-red-400 hover:bg-gray-900 rounded-xl">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-center border border-gray-700 rounded-xl text-gray-100 hover:border-[#C8A45E] hover:text-[#C8A45E] transition-all">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-center bg-[#C8A45E] text-gray-950 rounded-xl hover:bg-[#E2C882] transition-colors">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
