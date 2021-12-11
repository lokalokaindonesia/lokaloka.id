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
          100: '#ffffe4',
          200: '#fff7d0',
          300: '#ffe3bc',
          400: '#ffcfa8',
          500: '#f9bb94',
          600: '#e5a780',
          700: '#d1936c',
          800: '#bd7f58',
          900: '#a96b44'
        },
        teal: color.teal
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}