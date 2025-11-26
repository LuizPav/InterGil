/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ["HankenGrotesck-Medium", "sans-serif"],
        horizon: ["Horizon-regular", "sans-serif"],
        clearSans: ["clear-sans", "sans-serif"],
      },
      backgroundColor: {
        base: "#081736",
        lightbase: "#092a56",
        tabBarSelected: "#FFDE21",
      },
      textColor: {
        link: "#5271FF",
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
