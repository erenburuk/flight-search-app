/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          "url('https://unsplash.com/photos/blue-and-pink-light-illustration-LeG68PrXA6Y')",
      },
    },
  },
  plugins: [],
};
