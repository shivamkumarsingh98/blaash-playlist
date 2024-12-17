/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: "smooth",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hidden-scroll": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hidden-scroll::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
