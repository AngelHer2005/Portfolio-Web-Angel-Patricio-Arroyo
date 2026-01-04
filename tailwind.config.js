/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#0f750d', // Tu color verde original pero más moderno
        'dark-bg': '#050505',
      },
      fontFamily: {
        'code': ['Courier New', 'monospace'], // Fuente estilo hacker
      }
    },
  },
  plugins: [],
}