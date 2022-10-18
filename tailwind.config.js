/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		container: {
			padding: '2rem'
		},
		extend: {
			width: {
				maximum: '40rem',
				maxx: '50rem'
			}
		}
	},
	plugins: []
};
