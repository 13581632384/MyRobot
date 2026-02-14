/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#FFA07A',
        accent: '#FFD97D',
        light: '#FFF8E7',
        dark: '#2C3E50',
      },
    },
  },
  plugins: [],
}
