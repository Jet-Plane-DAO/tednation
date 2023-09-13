/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "night"],
  },
  plugins: [require("daisyui")],
};
