import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'text-sm font-medium',
        style: {
          background: '#111827', // gray-900
          color: '#f3f4f6', // gray-100
          border: '1px solid #1f2937', // gray-800
          borderRadius: '0.75rem',
          padding: '12px 16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        },
        success: {
          iconTheme: {
            primary: '#C8A45E', // Gold
            secondary: '#111827', // Dark
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444', // Red
            secondary: '#111827', // Dark
          },
        },
        duration: 4000,
      }}
    />
  );
};

export default Toast;
