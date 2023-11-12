/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");
module.exports = withMT( {
  content: ["./src/**/*.{html,js}",
  "./node_modules/tw-elements/dist/js/**/*.js"],
  
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '1rem',
      'lg': '2rem',
      'full': '9999px',
      'large': '12px',
    },
    //modified : lg, md

    opacity: {
      '0': '0',
      '15':'0.15',
      '20':'0.20',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '100': '1',
    },
    colors: {
      'darkblue': '#20232E',

    },
 
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  
  darkMode: "class"
});