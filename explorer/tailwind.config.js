/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      
			mobile: '300px',

			tablet: '690px',

			'sm-laptop': '1024px',

			laptop: '1200px',

			desktop: '1400px',

			'lg-desktop': '2000px',
		}
  },
  plugins: [],
}
