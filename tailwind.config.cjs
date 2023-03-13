/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			gridTemplateAreas: {
				layout: [
					'nav-bar top-bar',
					'nav-bar main-view',
					'now-playing-bar now-playing-bar',
				],
			},
		},
	},
	plugins: [require('@savvywombat/tailwindcss-grid-areas')],
};

module.exports = config;
