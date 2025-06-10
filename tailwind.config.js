/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        horizon: ["Horizon-regular", "sans-serif"],
        "hanken-medium": ["HankenGrotesck-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
