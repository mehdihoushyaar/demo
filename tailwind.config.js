/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff9b00',
        white: '#fff',
        light: '#d9d9d9',
        dark: '#222',
        darkest: '#151515',
      }
    },
  },
  plugins: [],
}