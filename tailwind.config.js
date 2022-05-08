const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '410px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        // sans: ['Open Sans', defaultTheme.fontFamily.sans]
        sans: ['Noto Sans', defaultTheme.fontFamily.sans]

      },
      colors: {
        'cornflower': {
          50: '#F5F5FF',
          100: '#E5E8FC',
          200: '#D1D6FF',
          300: '#B5BDFC',
          400: '#8C9EFA',
          500: '#6E85E3',
          600: '#5269BF',
          700: '#3D59AB',
          800: '#294799',
          900: '#143D8C'
        }
      }
    },
  },
  plugins: [],
}
