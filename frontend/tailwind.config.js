/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      charcoal: {
        950: "#0f1115",
        900: "#151821",
        800: "#1b1f2a",
        700: "#232838",
        600: "#2c3245",
      },
    },
  },
},
  plugins: [],
}