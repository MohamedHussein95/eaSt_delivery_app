/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				GILMER_HEAVY: ['GILMER_HEAVY'],
				GILMER_BOLD: ['GILMER_BOLD'],
				GILMER_MEDIUM: ['GILMER_MEDIUM'],
				GILMER_REGULAR: ['GILMER_REGULAR'],
			},
			colors: {
				primary: '#DC220F',
				secondary: '#F05600',
				inactive: '#B9BBC9',
				facebookColor: '#3b5998',
			},
		},
	},
	plugins: [],
};
