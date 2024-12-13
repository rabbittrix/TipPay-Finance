import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F2D675',
          main: '#E4B528',
          dark: '#B89020',
        },
        secondary: {
          light: '#4D4D4D',
          main: '#333333',
          dark: '#1A1A1A',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          // ... other gray shades if needed
        },
        // Remove text object and use direct color values
      }
    },
  },
  plugins: [],
}

export default config
