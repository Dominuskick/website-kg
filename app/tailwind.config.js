/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#DAC0A3",
        secondary: "#EADBC8",
        button: "#0F2C59",
        lightgray: '#D3D3D3',
      },
      fontFamily: {
        inter: ['Inter', "sans-serif"],
      },
      backgroundImage: {
        'main-photo': "url('/src/assets/main_photo.png')",
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

