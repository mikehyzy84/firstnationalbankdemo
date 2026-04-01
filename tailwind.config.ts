import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fnb: {
          teal: "#006B8F",
          "teal-light": "#1B9AC4",
          "dark-blue": "#1B4F7A",
          red: "#A01E22",
          bg: "#F5F5F5",
          border: "#CCCCCC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
