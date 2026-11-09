import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookie_consent', 'accepted', { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] transform transition-transform duration-500 translate-y-0 p-4">
      <div className="max-w-7xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <p className="text-gray-300 text-sm leading-relaxed">
            We use cookies to enhance your experience. By continuing, you agree to our{' '}
            <Link to="/cookies" className="text-[#C8A45E] hover:underline transition-all">Cookie Policy</Link> and{' '}
            <Link to="/terms" className="text-[#C8A45E] hover:underline transition-all">Terms of Service</Link>.
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto">
          <button
            onClick={handleDecline}
            className="px-5 py-2 text-sm text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-full transition-colors border border-transparent hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Decline
          </button>
          <Link
            to="/cookies"
            className="px-5 py-2 text-sm text-[#C8A45E] border border-[#C8A45E]/30 hover:border-[#C8A45E] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
          >
            Manage Preferences
          </Link>
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-sm bg-[#C8A45E] text-gray-950 font-medium rounded-full hover:bg-[#E2C882] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
