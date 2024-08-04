/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "1364px" },
      // => @media (min-width: 640px) { ... }
      max950: { max: "950px" },
      max951: { max: "951px" },
      max467: { max: "467px" },
      max400: { max: "400px" },
      max500: { max: "500px" },
      max550: { max: "550px" },
      max1200: { max: "1200px" },
      max767: { max: "767px" },
      max400: { max: "400px" },
      max1056: { max: "1056px" },
      maxWeb1: { min: "1920px" },
      maxWeb2: "2560px",
      maxWeb3: "3840px",
      maxWeb4: "3440px",
      // min951: {'min': '952px'},
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
