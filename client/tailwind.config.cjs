/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#4d3cdf",
          // secondary: "#f6d860",
          accent: "#37cdbe",
          // neutral: "#3d4451",
          // "base-100": "#ffffff",
        },
      },
    ],
  },

}