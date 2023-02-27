/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      colors: {
        'panel-grey': '#2D3C60',
        'white': '#ffffff'
      },
      spacing: {
        '300': '300px',
        '250': '250px',
        '100': '100px',
        '50': '50px'
      }
    },
  },
  plugins: [],
}
