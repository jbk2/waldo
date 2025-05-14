/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:   { debug: '#ff00ff' }, // bg-debug
      fontFamily: {
        'playrite': ['"playrite"'],
        'raleway': ['"raleway"'],
        'raleway-italic': ['"raleway-italic"'],
      },
      keyframes: {
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0'}
        },
        'scale-pulse-twice': {
          '0%': { transform: 'scale(1)', easing: 'ease-in' },
          '50%': { transform: 'scale(1.1)', easing: 'ease-out' },
          '100%': { transform: 'scale(1)', easing: 'ease-in' },
        },
      },
      animation: {
        'fade-out': 'fade-out 1s ease forwards',
        'scale-pulse-twice': 'scale-pulse-twice 0.5s ease-in-out 2 forwards',
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(1, 0.1, 1, 0.69)',
      },
      transitionDuration: {
        '3000': '3000ms', // 3 seconds
        '10000': '10000ms', // 10 seconds
      },
    },
  },
  plugins: [],
}