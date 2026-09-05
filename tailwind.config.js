/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#598F83',
        'bg-deep': '#3F6B62',
        cream: '#EDE6C4',
        sage: '#8FAF9F',
        gold: '#F2C94C',
        purple: '#6C3FA6',
        comicBlue: '#2F6FA8',
        ink: '#132420',
        comicWhite: '#FBF9F1',
      },
      fontFamily: {
        display: ['"Luckiest Guy"', 'cursive'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'comic-gold': '0 4px 0 #b98f22',
        'comic-gold-lg': '0 6px 0 #b98f22',
        'comic-purple': '0 4px 0 #4d2b77',
        'comic-deep': '0 4px 0 #28443e',
        'comic-card': '0 10px 25px -5px rgba(19, 36, 32, 0.4), 0 8px 10px -6px rgba(19, 36, 32, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
