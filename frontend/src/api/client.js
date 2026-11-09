import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  // Pass CSRF token if it exists
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  return config;
}, (error) => Promise.reject(error));

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Only toast network error if not abort or silent check
      if (error.code !== 'ERR_CANCELED') {
        console.warn('Network or CORS error connecting to backend API');
      }
      return Promise.reject(error);
    }
    
    const { status, config } = error.response;
    
    if (status === 401) {
      // Silence toast and redirect on routine auth status check (/auth/me)
      const isAuthCheck = config?.url?.includes('/auth/me');
      if (!isAuthCheck && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else if (status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else if (status >= 500) {
      toast.error('A server error occurred. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

export const api = {
  get: (url, config) => client.get(url, config),
  post: (url, data, config) => client.post(url, data, config),
  patch: (url, data, config) => client.patch(url, data, config),
  delete: (url, config) => client.delete(url, config),
};

export default client;
