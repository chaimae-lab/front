tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Chemin adapté à React
  theme: {
    extend: {},
  },
  plugins: [],
}



// postcss.config.js
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }