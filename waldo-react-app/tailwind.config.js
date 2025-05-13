/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:   { debug: '#ff00ff' }, // bg-debug
      // fontFamily: { 'kyiv-sans': ['"kyiv-sans"', 'sans-serif'] },
    },
  },
  plugins: [],
}