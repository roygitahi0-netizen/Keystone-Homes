import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { formatCurrency } from '../utils/formatters';
import BookingModal from '../components/booking/BookingModal';
import toast from 'react-hot-toast';

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data.property);
      } catch (err) {
        toast.error('Failed to load property details');
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div className="min-h-screen pt-24 text-center text-gray-900 dark:text-white">Loading...</div>;

  const handleBookingConfirm = async (bookingData) => {
    try {
      await api.post('/bookings', { ...bookingData, property_id: property.id });
      toast.success('Reservation confirmed successfully! Please proceed to payment if required.');
      setShowBookingModal(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0f] min-h-screen py-12 text-gray-900 dark:text-gray-100">
      <Helmet><title>{property.title} | KeyStone Homes</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-2">{property.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2"><FaMapMarkerAlt className="text-gold-500" /> {property.address}, {property.city}, {property.state}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-gold-500">{formatCurrency(property.price)}</p>
            <span className="inline-block mt-2 bg-gray-900 border border-gray-800 text-gold-400 px-4 py-1 rounded-full text-sm font-semibold">{property.status}</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:col-span-2 h-[60vh] rounded-2xl overflow-hidden">
            <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/1200x800'} alt="Main" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-4 h-[60vh]">
            <div className="flex-1 rounded-2xl overflow-hidden"><img src={property.images && property.images.length > 1 ? property.images[1] : 'https://via.placeholder.com/600x400'} alt="View 2" className="w-full h-full object-cover" /></div>
            <div className="flex-1 rounded-2xl overflow-hidden relative">
              <img src={property.images && property.images.length > 2 ? property.images[2] : 'https://via.placeholder.com/600x400'} alt="View 3" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/20 transition">
                <span className="text-white font-semibold">View All Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Key Facts */}
            <div className="flex justify-around glassmorphism p-6 rounded-2xl">
              <div className="text-center"><FaBed className="text-3xl text-gold-500 mx-auto mb-2" /><p className="text-gray-900 dark:text-white font-bold">{property.bedrooms} Beds</p></div>
              <div className="text-center"><FaBath className="text-3xl text-gold-500 mx-auto mb-2" /><p className="text-gray-900 dark:text-white font-bold">{property.bathrooms} Baths</p></div>
              <div className="text-center"><FaRulerCombined className="text-3xl text-gold-500 mx-auto mb-2" /><p className="text-gray-900 dark:text-white font-bold">{property.size_sqft} sqft</p></div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{property.description}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(property.amenities || property.features || []).map(f => (
                  <div key={f} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div> {f}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="glassmorphism p-6 rounded-2xl text-center">
              <img src={property.agent?.user?.avatar_url || 'https://via.placeholder.com/150'} alt={property.agent?.user?.first_name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{property.agent?.user?.first_name} {property.agent?.user?.last_name}</h3>
              <p className="text-gold-500 mb-6">{property.agent?.phone}</p>
              {property.listing_type === 'short_term' ? (
                <>
                  <p className="text-sm text-gray-400 mb-2">Price per night</p>
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-gold-500 text-black py-3 rounded-full font-bold hover:bg-gold-400 mb-4 transition"
                  >
                    Reserve & Pay
                  </button>
                </>
              ) : (
                <button className="w-full bg-gold-500 text-black py-3 rounded-full font-bold hover:bg-gold-400 mb-4 transition">Contact Agent</button>
              )}
              
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2">
                <FaHeart /> Save to Favorites
              </button>
            </div>
          </aside>
        </div>
      </div>
      {showBookingModal && (
        <BookingModal 
          property={property} 
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm} 
        />
      )}
    </div>
  );
}
