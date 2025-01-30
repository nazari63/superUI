const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        red: {
          50: '#fce6ea',
          100: '#f7b0be',
          200: '#f38a9e',
          300: '#ee5572',
          400: '#ea3456',
          500: '#e5012c',
          600: '#d00128',
          700: '#a3011f',
          800: '#7e0118',
          900: '#600012',
        },
        primary: '#e5012c',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
