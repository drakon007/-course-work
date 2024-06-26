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
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        'panel-grey': '#2D3C60',
        'white': 'rgb(76,81,85)',
        'black': '#000000',
        'textColor': 'rgb(76,81,85)',
        'bgpage': 'rgb(240,241,243)',
        'bgform': 'rgb(255,255,255)',
        'bgbut': 'rgb(247,253,255)',
        // 'bgbut': 'rgb(110,115,124)',
        // 'white': '#ffffff',
        //'textColor': '#4980BF',
        // 'bgpage': 'rgb(19, 19, 21)', темный цвет
        // 'bgform': 'rgb(38, 37, 43)',
        // 'bgbut': 'rgb(107, 117, 127)',
        // 'tgray': 'rgb(140, 140, 148)',
        // 'gray': 'rgb(100, 100, 100)',
        // 'light-gray': 'rgb(200, 200, 200)',
        // 'dark-gray': 'rgb(41, 48, 54)',
        // 'very-dark-gray': 'rgb(17, 17, 17)',
        // 'dark-blue': 'rgb(35, 47, 61)',
      },
      height: {
        'table': '80vh',
        'form': '50vh',
        '900': '900px',
        '700': '700px',
        '500': '500px',
        '300': '300px',
        '250': '250px',
        '200': '200px',
        '150': '150px',
        '100': '100px',
        '50': '50px',
        '35': '35px',
        '20': '20px',
      },
      width: {
        'card': '22.75%',
        'gap':  '3%', 
        'aside': '15%',
        'form': '450px',
        'mid': '50%',
        'min': '20%',
        '900': '900px',
        '700': '700px',
        '500': '500px',
        '300': '300px',
        '250': '250px',
        '200': '200px',
        '150': '150px',
        '100': '100px',
        '50': '50px',
        '35': '35px',
        '20': '20px',
      },
      spacing: {
        'height': '1080px',
        '900': '900px',
        '700': '700px',
        '500': '500px',
        '300': '300px',
        '250': '250px',
        '200': '200px',
        '150': '150px',
        '100': '100px',
        '50': '50px',
      },
      margin: {
        'upform': '15vh',
        'downform': '10vh',
        '25px': '25px',
        '20px': '20px',
        '15px': '15px',
        '10px': '10px',
        '5px': '5px',
      },
      padding: {
        'form': '25vh',
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
