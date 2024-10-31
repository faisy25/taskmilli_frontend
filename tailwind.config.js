/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        dark: "#405D72",
        medium: "#758694",
        light: "#F7E7DC",
        dim: "#FFF8F3",
      },
      fontFamily: {
        hind: ["Hind", "sans-serif"],
      },
      fontWeight: {
        bolder: "800",
        bold: "700",
        medium: "500",
        normal: "400",
      },
    },
  },
  plugins: [],
};
