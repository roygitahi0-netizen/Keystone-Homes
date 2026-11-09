import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { validatePassword } from '../utils/validators';

export default function Signup() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    const pwdErr = validatePassword(formData.password);
    if (pwdErr) return setError(pwdErr);

    setLoading(true);
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    };
    const success = await signup(payload);
    setLoading(false);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#0a0a0f]">
      <Helmet><title>Sign Up | KeyStone Homes</title></Helmet>
      
      <div className="glassmorphism w-full max-w-lg p-8 rounded-2xl animate-fadeInUp">
        <h2 className="text-3xl font-serif font-bold text-center text-white mb-8">Create an Account</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input type="text" name="firstName" onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input type="text" name="lastName" onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input type="email" name="email" onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input type="tel" name="phone" onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input type="password" name="password" onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded-lg text-white" required />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" required className="rounded bg-gray-900 border-gray-700 text-gold-500 focus:ring-gold-500" />
            <span className="text-sm text-gray-400">I agree to the <Link to="/terms" className="text-gold-500 hover:underline">Terms</Link> and <Link to="/privacy" className="text-gold-500 hover:underline">Privacy Policy</Link></span>
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-gold-500 text-black py-3 rounded-full font-bold hover:bg-gold-400 transition disabled:opacity-50 mt-6">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-gold-500 hover:text-gold-400 font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
}
