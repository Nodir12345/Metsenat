/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue:{
          DEFAULT:"#3366ff"
        },
        white:{
          DEFAULT:"#fff"
        },
        
      }
    },
  },
  plugins: [],
}

