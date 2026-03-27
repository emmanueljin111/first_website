/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          background: '#0f0f10',
          panel: '#151518',
          accent: '#d4af37',
          muted: '#a1a1aa'
        }
      },
      boxShadow: {
        luxe: '0 20px 60px -30px rgba(212, 175, 55, 0.35)'
      }
    }
  },
  plugins: []
}
