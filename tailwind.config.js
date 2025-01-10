/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

