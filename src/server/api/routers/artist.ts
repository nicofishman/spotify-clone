import { checkRes } from '@/server/api/routers/me/player';
import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

export const artistRouter = createTRPCRouter({
	get: protectedProcedureWithAccount
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const res = await fetch(`${API_URL}/artists/${input}`, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
			});

			await checkRes(res, 200);

			const resJson =
				(await res.json()) as SpotifyApi.SingleArtistResponse;

			return resJson;
		}),
	getTopTracks: protectedProcedureWithAccount
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const res = await fetch(
				`${API_URL}/artists/${input}/top-tracks?market=ES`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'GET',
				}
			);

			await checkRes(res, 200);

			const resJson =
				(await res.json()) as SpotifyApi.ArtistsTopTracksResponse;

			return resJson;
		}),
	getAlbums: protectedProcedureWithAccount
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const res = await fetch(
				`${API_URL}/artists/${input}/albums?market=ES`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'GET',
				}
			);

			await checkRes(res, 200);

			const resJson =
				(await res.json()) as SpotifyApi.ArtistsAlbumsResponse;

			return resJson;
		}),
	getRelatedArtists: protectedProcedureWithAccount
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const res = await fetch(
				`${API_URL}/artists/${input}/related-artists`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'GET',
				}
			);

			await checkRes(res, 200);

			const resJson =
				(await res.json()) as SpotifyApi.ArtistsRelatedArtistsResponse;

			return resJson;
		}),
});
