import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.get(`/auth/verify-email/${token}`)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#0a0a0f]">
      <Helmet><title>Verify Email | KeyStone Homes</title></Helmet>
      <div className="glassmorphism w-full max-w-md p-8 rounded-2xl text-center">
        {status === 'loading' && <p className="text-gold-500 animate-pulse">Verifying your email...</p>}
        {status === 'success' && (
          <div>
            <h2 className="text-2xl font-serif text-white mb-4">Email Verified!</h2>
            <p className="text-gray-400 mb-6">Your account is now fully active.</p>
            <Link to="/login" className="bg-gold-500 text-black px-6 py-2 rounded-full font-bold">Go to Login</Link>
          </div>
        )}
        {status === 'error' && (
          <div>
            <h2 className="text-2xl font-serif text-red-500 mb-4">Verification Failed</h2>
            <p className="text-gray-400 mb-6">The link is invalid or has expired.</p>
            <Link to="/login" className="text-gold-500 hover:underline">Return to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
