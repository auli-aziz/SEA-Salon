import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        economica: ['Economica'],
        montserrat: ['Montserrat'],
        heading: ['Shadows Into Light'],
      },
    }
  },
  plugins: [],
})

