/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f6f6f7',
          100: '#e1e3e6',
          200: '#c2c6cd',
          300: '#9aa0ab',
          400: '#6b7384',
          500: '#4b5563',
          600: '#374151',
          700: '#2b3341',
          800: '#1e242f',
          900: '#14181f',
          950: '#0a0a0f',
        },
        gold: {
          50: '#fcfaf6',
          100: '#f7f2e8',
          200: '#ecdcd1',
          300: '#e2c882',
          400: '#d7b56a',
          500: '#C8A45E',
          600: '#b08a47',
          700: '#8e6c35',
          800: '#72562d',
          900: '#5c4627',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
