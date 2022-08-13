/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./Skeleton.jsx",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          700: "#141414"
        }
      },
      boxShadow: {
        "10xl": "1px 6px 14px 4px #1c1c1cd1"
      },
    },
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