/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search': "url('../src/img/search.png')",
      },
      colors: {
        'panel-grey': '#2D3C60',
        'white': '#ffffff',
      },
      spacing: {
        '300': '300px',
        '250': '250px',
        '100': '100px',
        '50': '50px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
