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
        '200': '200px',
        '150': '150px',
        '100': '100px',
        '50': '50px',
      },
      margin: {
        '25px': '25px',
        '20px': '20px',
        '15px': '15px',
        '10px': '10px',
        '5px': '5px',
      },
      padding: {
        '25px': '25px',
        '20px': '20px',
        '15px': '15px',
        '10px': '10px',
        '5px': '5px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
