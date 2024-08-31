/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode : 'class', // config for dark mode system
    content: [
      './src/**/*.{html,js}', // entry point f find .html, .js in src
      './dist/**/*.html', // entry point f .html, .js in src
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
   