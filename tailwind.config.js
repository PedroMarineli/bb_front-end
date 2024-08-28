/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['mainFont'],
        bbFont: ['bbFont']
      },
      colors: {
        black: '#000',
        white: '#fff',
        seaBlue: '#162836',
        brown: '#302925'
      },
      backgroundImage: {
        'hamburguer': "url('/images/hamburguerBackground.png')",
        'fundo': "url('/images/fundo.png')",
      }
    },
  },
  plugins: [],
}

