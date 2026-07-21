/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000', // Pure Black
          dark: '#0a0a0a',
          light: '#333333'
        },
        accent: {
          DEFAULT: '#c05621', // Burnt Orange / Terracotta
          dark: '#9c4221',
          light: '#dd6b20'
        },
        surface: '#ffffff', // Pure White base
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Josefin Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
