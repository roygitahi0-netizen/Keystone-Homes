import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
      toast.success('Reset link sent if the email exists.');
    } catch (err) {
      setSubmitted(true); // Security: do not reveal if exists
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#0a0a0f]">
      <Helmet><title>Forgot Password | KeyStone Homes</title></Helmet>
      <div className="glassmorphism w-full max-w-md p-8 rounded-2xl animate-fadeInUp">
        <h2 className="text-3xl font-serif font-bold text-center text-white mb-6">Reset Password</h2>
        {submitted ? (
          <div className="text-center">
            <p className="text-gray-300 mb-6">If an account exists for {email}, you will receive a password reset link shortly.</p>
            <Link to="/login" className="text-gold-500 font-semibold hover:underline">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-gray-400">Enter your email address and we'll send you a link to reset your password.</p>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold-500 text-black py-3 rounded-full font-bold hover:bg-gold-400 transition disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
