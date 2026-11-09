import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4">
      <Helmet><title>Contact Us | KeyStone Homes</title></Helmet>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-serif font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-gray-400 mb-12">Whether you are looking to buy, sell, or simply explore your options, our team is here to assist you with discretion and expertise.</p>
          
          <div className="space-y-6 mb-12">
            <div>
              <h4 className="text-white font-bold text-lg">Address</h4>
              <p className="text-gray-400">123 Luxury Ave, Suite 500<br/>New York, NY 10001</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Contact Info</h4>
              <p className="text-gray-400">contact@keystonehomes.com<br/>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="glassmorphism p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input type="text" required className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" required className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <select className="w-full bg-gray-900 border-gray-700 rounded-lg text-white">
                <option>Buying</option>
                <option>Selling</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea rows="4" required className="w-full bg-gray-900 border-gray-700 rounded-lg text-white"></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold-500 text-black py-4 rounded-full font-bold hover:bg-gold-400 transition">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
