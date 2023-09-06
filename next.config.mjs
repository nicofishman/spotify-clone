// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	redirects: async () => [
		{
			source: '/artist/:id/discography',
			destination: '/artist/:id/discography/all',
			permanent: true,
		},
	],
	images: {
		domains: [
			'',
			'blend-playlist-covers.spotifycdn.com',
			'images-ak.spotifycdn.com',
			'scontent.fmaa10-1.fna.fbcdn.net',
			'wrapped-images.spotifycdn.com',
			'platform-lookaside.fbsbx.com',
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},

	/**
	 * If you have the "experimental: { appDir: true }" setting enabled, then you
	 * must comment the below `i18n` config out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
};
export default config;
