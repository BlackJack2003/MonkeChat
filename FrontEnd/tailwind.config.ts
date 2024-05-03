import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'selector',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // White
        white: '#ffffff',
        // Sky Blue
        sky: {
          DEFAULT: '#87CEEB',
          light: '#B0E2FF',
          dark: '#5CB3FF',
        },
        // Blue
        blue: {
          DEFAULT: '#4169E1',
          light: '#6495ED',
          dark: '#1E90FF',
        },
        myBg: {
          DEFAULT:"#cfd2d6",
          dark: "#1F2937",
          light: "#cfd2d6",
          light_dark : "#4B5563",
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
