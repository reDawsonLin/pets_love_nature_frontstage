/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      // Neutral, Rose, mandarin
      mandarin: {
        50: "#FEFCFB",
        100: "#FDF6F2",
        200: "#FAEEE5",
        300: "#F8E5D8",
        400: "#F5DAC8",
        500: "#EFC5A9",
        600: "#E9AE86",
        700: "#E1915B",
        800: "#D36C26",
        900: "#974D1B",
        950: "#6C3714",
      },
    },
  },
  plugins: [],
};
