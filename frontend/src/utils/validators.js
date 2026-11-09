import DOMPurify from 'dompurify';

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!re.test(email)) return 'Invalid email format';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return '';
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-]{10,15}$/;
  if (phone && !re.test(phone)) return 'Invalid phone number';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || String(value).trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const sanitizeInput = (text) => {
  return DOMPurify.sanitize(text);
};
