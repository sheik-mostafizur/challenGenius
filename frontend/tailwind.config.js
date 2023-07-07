/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#edfaff",
        100: "#d6f2ff",
        200: "#b5eaff",
        300: "#83dfff",
        400: "#48cbff",
        500: "#1eadff",
        600: "#068fff",
        700: "#007bff", //#007bff
        800: "#085ec5",
        900: "#0d519b",
        950: "#0e315d",
      },
    },
    extend: {},
  },
  plugins: [],
};
