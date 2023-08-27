/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				spotify: ['Spotify', 'Comic sans ms', 'sans-serif'],
			},
			fontSize: {
				xxs: '0.6875rem',
			},
			backgroundImage: {
				'liked-songs-bg': 'linear-gradient(135deg,#450af5,#c4efd9)',
			},
			colors: {
				'spotify-green': '#1DB954',
                'bg-color': '#121212',
				'gray-bg': '#181818',
				'gray-border': '#282828',
				'gray-text': '#b3b3b3',
			},
			gridTemplateAreas: {
				layoutLarge: [
					'nav-bar main-view',
					'now-playing-bar now-playing-bar',
				],
                layoutSmall: [
                    'main-view',
                    'now-playing-bar',
                ],
			},
            keyframes: {
                "accordion-down": {
                    from: { height: '0' },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: '0' },
                },
                },
                animation: {
                    "accordion-down": "accordion-down 0.2s ease-out",
                    "accordion-up": "accordion-up 0.2s ease-out",
                },
		},
	},
	plugins: [
		require('@savvywombat/tailwindcss-grid-areas'),
		require('@tailwindcss/container-queries'),
	],
};

module.exports = config;
