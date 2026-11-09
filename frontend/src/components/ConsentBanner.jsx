import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Cookies.get('cookieConsent')) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 p-4 z-50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-300">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
      </p>
      <div className="flex gap-4">
        <button onClick={accept} className="bg-gold-500 text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gold-400">
          Accept
        </button>
      </div>
    </div>
  );
}
