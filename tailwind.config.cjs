/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				spotify: [
					'CircularSp',
					'CircularSp-Arab',
					'CircularSp-Hebr',
					'CircularSp-Cyrl',
					'CircularSp-Grek',
					'CircularSp-Deva',
					'sans-serif',
				],
			},
			backgroundImage: {
				'liked-songs-bg': 'linear-gradient(135deg,#450af5,#c4efd9)',
			},
			colors: {
				'spotify-green': '#1DB954',
				'gray-bg': '#181818',
				'gray-border': '#282828',
				'gray-text': '#b3b3b3',
			},
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
