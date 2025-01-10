/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<root>/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"],
        RubikBold: ["RubikBold", "sans-serif"],
        RubikExtraBold: ["RubikExtraBold", "sans-serif"],
        RubikLight: ["RubikLight", "sans-serif"],
        RubikMedium: ["RubikMedium", "sans-serif"],
        RubikSemiBold: ["RubikSemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

