import React, { useState } from 'react';
import { FaTimes, FaCreditCard, FaLock } from 'react-icons/fa';
import { formatCurrency } from '../../utils/formatters';

export default function BookingModal({ property, onClose, onConfirm }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simple validation for mock purposes
  const getDays = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days;
  };

  const days = getDays();
  const total = days > 0 ? days * property.price : 0; // price is per night

  const handleSubmit = (e) => {
    e.preventDefault();
    if (days <= 0) {
      setError("Please select valid dates");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onConfirm({ checkIn, checkOut, total });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">
      <div className="glassmorphism w-full max-w-lg rounded-2xl overflow-hidden animate-fadeInUp">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-serif text-gray-900 dark:text-white">Reserve Your Stay</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Check-in</label>
              <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} 
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Check-out</label>
              <input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><FaCreditCard /> Payment Details (Mock)</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white" required />
                <input type="text" placeholder="CVC" className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white" required />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1"><FaLock /> Secure encrypted transaction</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center text-lg">
            <span className="text-gray-700 dark:text-gray-300">Total ({days > 0 ? days : 0} nights)</span>
            <span className="text-gold-500 font-bold">{formatCurrency(total)}</span>
          </div>

          <button type="submit" disabled={loading} 
            className="w-full bg-gold-500 text-black py-4 rounded-full font-bold hover:bg-gold-400 transition disabled:opacity-50">
            {loading ? 'Processing...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
}
