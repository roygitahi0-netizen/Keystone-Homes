export const PROPERTY_TYPES = [
  'House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Land', 'Commercial'
];

export const LISTING_TYPES = [
  'For Sale', 'For Rent'
];

export const AMENITIES_LIST = [
  'Swimming Pool', 'Gym', 'Parking', 'Security', 
  'Garden', 'Air Conditioning', 'Elevator', 'Smart Home'
];

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Size', value: 'size_desc' }
];

export const PRICE_RANGES = [
  { label: 'Any', min: 0, max: 999999999 },
  { label: 'Under $500k', min: 0, max: 500000 },
  { label: '$500k - $1M', min: 500000, max: 1000000 },
  { label: '$1M - $2M', min: 1000000, max: 2000000 },
  { label: '$2M+', min: 2000000, max: 999999999 }
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/1234567890',
  instagram: 'https://instagram.com/keystonehomes',
  twitter: 'https://twitter.com/keystonehomes'
};
