/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f3f5f8',
          100: '#e5e9ef',
          200: '#c9d1dc',
          300: '#9aa7b8',
          400: '#6b7a90',
          500: '#4a5a72',
          600: '#34445c',
          700: '#233248',
          800: '#16222f',
          900: '#0e1621',
        },
        brand: {
          DEFAULT: '#0e1621',
          orange: '#f28c1e',
        },
        ok: { DEFAULT: '#2f855a', soft: '#e6f4ec' },
        warn: { DEFAULT: '#b7791f', soft: '#fdf3dc' },
        danger: { DEFAULT: '#c53030', soft: '#fdeaea' },
        surface: '#f5f6f8',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans Kannada',
          'Noto Sans Devanagari',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: { card: '10px' },
      boxShadow: { card: '0 1px 2px rgba(14,22,33,0.05)' },
    },
  },
  plugins: [],
};
