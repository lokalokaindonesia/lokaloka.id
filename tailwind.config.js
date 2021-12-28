const color = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Plus Jakarta Display'],
      'body': ['Plus Jakarta Text',],
    },
    extend: {
      colors: {
        orange: {
          90: '#ffffd9',
          100: '#ffffc5',
          200: '#fffbb1',
          300: '#ffe79d',
          400: '#ffd389',
          500: '#FFBF75',
          600: '#ebab61',
          700: '#d7974d',
          800: '#c38339',
          900: '#af6f25'
        },
        teal: color.teal
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}