import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-[#C8A45E] to-[#E2C882] rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-950 transform -rotate-45" />
              </div>
              <span className="text-xl font-serif text-[#C8A45E]">KeyStone</span>
              <span className="text-xl font-sans text-gray-100 font-light tracking-wide">Homes</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Redefining luxury real estate. Discover exclusive properties in the most sought-after locations, curated for discerning clientele.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="WhatsApp" className="text-gray-400 hover:text-[#C8A45E] transition-colors duration-300 hover:-translate-y-1">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#C8A45E] transition-colors duration-300 hover:-translate-y-1">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-[#C8A45E] transition-colors duration-300 hover:-translate-y-1">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#C8A45E] font-serif text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Properties', 'Agents', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="text-gray-400 hover:text-[#C8A45E] text-sm transition-colors duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h3 className="text-[#C8A45E] font-serif text-lg mb-6">Property Types</h3>
            <ul className="space-y-3">
              {['Apartments', 'Houses', 'Villas', 'Commercial', 'Land', 'Vacation'].map((type) => (
                <li key={type}>
                  <Link to={`/properties?type=${type.toLowerCase()}`} className="text-gray-400 hover:text-[#C8A45E] text-sm transition-colors duration-300">
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-[#C8A45E] font-serif text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <strong className="block text-gray-300 mb-1">Address:</strong>
                123 Luxury Ave, Suite 500<br />Beverly Hills, CA 90210
              </li>
              <li>
                <strong className="block text-gray-300 mb-1">Phone:</strong>
                <a href="tel:+13105550199" className="hover:text-[#C8A45E] transition-colors">+1 (310) 555-0199</a>
              </li>
              <li>
                <strong className="block text-gray-300 mb-1">Email:</strong>
                <a href="mailto:info@keystonehomes.com" className="hover:text-[#C8A45E] transition-colors">info@keystonehomes.com</a>
              </li>
              <li>
                <strong className="block text-gray-300 mb-1">Hours:</strong>
                Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 KeyStone Homes. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-[#C8A45E] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-[#C8A45E] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
