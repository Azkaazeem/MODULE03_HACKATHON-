/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf3',
          100: '#d6f5e1',
          200: '#b0e9c3',
          300: '#7fd99f',
          400: '#46c073',
          500: '#22a559',
          600: '#178348',
          700: '#14683b',
          800: '#145332',
          900: '#12452c',
        },
      },
      boxShadow: {
        glow: '0 20px 80px rgba(34, 165, 89, 0.2)',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
