import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}',
    join(require.resolve(
      '@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    ),],
  theme: {
    extend: {
      colors: {
        'gray-texts': '#757095',
        'blue-linktic': '#006AFF',
        'red-betel': '#FF461E',
        'gray-lines': '#DADCEE',
        'blueligth-linktic': '#F2F8FF',
        'black-linktic': '#28283D',
        'blue-navy': '#003075',
        'border-cards': '#DADCEE',
        'card-gray': '#F8F8F8',
        'dark-text': '#fff',
        'secundary-text': '#ffffffd6',
        'secundary-background': '#1e1f20',
        'red':{
          '500':'#F05945'
        },
        'yellow':{
          '400':'#FFC947'
        },
        'blue':{
          '500':'#009CFF',
          '900': '#1C3462'
        }
      },
      borderRadius: {
      'cardxl': '3.2rem',
      },
      screens: {
        xs: '380px',
        custom: '900px'
      },
      fontFamily: {
        'sans': ['montserrat', ...defaultTheme.fontFamily.sans],
        'amatic': ['Amatic SC'],
        'spooky': ['Spookyman'],
        'montserrat': ['Montserrat']
      },
    },
  },
  plugins: [skeleton],
}

