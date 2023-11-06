import type { Config } from "tailwindcss";

const primary = "#000";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    colors: {
      primary,
      white: "#fff",
      red: "#E94040",
      blue: {
        300: "#E7F0FF",
        500: "#1C60C5",
        800: "#113E81",
      },
      gray: {
        300: "#EAEAEA",
        450: "#c5c5c5",
        400: "#ABABAB",
        600: "#5F5F5F",
        700: "#303030",
      },
    },
  },
  plugins: [],
};
export default config;
