/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,tsx}"],
  theme: {
    extend: {
      minHeight: { screen: "100vh" },
    },
  },
  daisyui: {
    themes: ["light", "dark", "night"],
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
