/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pastel-pink": "#ffd1dc",
        "pastel-blue": "#cde7f0",
        "pastel-purple": "#cdb4db",
      },
    },
  },
  plugins: [],
};
