import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-serif text-gold-500 mb-4">KeyStone Homes</h3>
          <p className="text-gray-400 text-sm">Premium real estate platform helping you find the perfect luxury home tailored to your lifestyle.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/properties" className="hover:text-gold-400">Properties</Link></li>
            <li><Link to="/agents" className="hover:text-gold-400">Agents</Link></li>
            <li><Link to="/about" className="hover:text-gold-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/faq" className="hover:text-gold-400">FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-gold-400">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-gold-400">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>contact@keystonehomes.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Luxury Ave, NY 10001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center pt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} KeyStone Homes. All rights reserved.
      </div>
    </footer>
  );
}
