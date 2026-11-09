import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/dashboard';
      navigate(returnUrl);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const success = await googleLogin(response.credential);
    if (success) {
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/dashboard';
      navigate(returnUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm"></div>
      <Helmet>
        <title>Login | KeyStone Homes</title>
      </Helmet>
      
      <div className="glassmorphism w-full max-w-md p-8 rounded-2xl relative z-10 animate-fadeInUp">
        <h2 className="text-3xl font-serif font-bold text-center text-white mb-8">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border-gray-700 rounded-lg text-white focus:border-gold-500 focus:ring-gold-500"
              required 
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <Link to="/forgot-password" className="text-sm text-gold-500 hover:text-gold-400">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border-gray-700 rounded-lg text-white focus:border-gold-500 focus:ring-gold-500"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-500 text-black py-3 rounded-full font-bold hover:bg-gold-400 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-900 text-gray-400">Or continue with</span></div>
          </div>
          <div className="mt-6 flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} theme="filled_black" shape="pill" />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/signup" className="text-gold-500 hover:text-gold-400 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
