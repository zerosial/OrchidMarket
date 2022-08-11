/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ani-100": "#9E7CB1",
        "ani-300": "#7B5093",
        "ani-500": "#5D2E77",
        "ani-700": "#43165C",
        "ani-900": "#2A053F",
      },
    },
  },
  plugins: [],
};
