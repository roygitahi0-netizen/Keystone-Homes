import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import useDebounce from './useDebounce';

export default function useProperties(initialFilters = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [filters, setFilters] = useState(initialFilters);

  const debouncedFilters = useDebounce(filters, 500);

  const fetchProperties = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      // Build query string
      const params = new URLSearchParams();
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value);
          }
        }
      });

      const response = await api.get(`/properties?${params.toString()}`);
      const payload = response.data?.data;
      
      if (payload && payload.items) {
        setProperties(payload.items);
        setPagination({
          total: payload.total || payload.items.length,
          page: payload.page || 1,
          pages: payload.pages || 1
        });
      } else if (Array.isArray(payload)) {
        setProperties(payload);
        setPagination({ total: payload.length, page: 1, pages: 1 });
      } else {
        setProperties(response.data?.properties || []);
      }
    } catch (err) {
      console.error('Failed to fetch properties from API, using fallback data:', err);
      // fallback mock data if server is unreachable
      setProperties([
        { id: 1, title: 'Luxury Villa', price: 2500000, bedrooms: 5, bathrooms: 4, size_sqft: 4500, property_type: 'Villa', status: 'available', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Modern Penthouse', price: 1200000, bedrooms: 3, bathrooms: 2, size_sqft: 2200, property_type: 'Apartment', status: 'available', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
      ]);
      setError('Could not fetch properties from backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(debouncedFilters);
  }, [debouncedFilters, fetchProperties]);

  return {
    properties,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    fetchProperties
  };
}
