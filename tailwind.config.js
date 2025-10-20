/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './*.php',           // theme root
      './**/*.php',        // all subdirectories
      './assets/js/**/*.js' // JS files where classes may appear
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  