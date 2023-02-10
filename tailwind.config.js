/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      white: '#ededed',
      beer: '#fbb117',
    },
    extend: {}
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('flowbite/plugin')
  ],
}
