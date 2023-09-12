import { createTRPCRouter } from '@/server/api/trpc';
import { protectedProcedureWithAccount } from './../trpc';
import { z } from 'zod';
import { API_URL } from '@/utils/spotify';
import { checkRes } from '@/server/api/routers/me/player';

export const playlistRouter = createTRPCRouter({
	get: protectedProcedureWithAccount
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const res = await fetch(`${API_URL}/playlists/${input}`, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
				method: 'GET',
			});

			const resJson = (await res.json()) as SpotifyApi.PlaylistObjectFull;
			return resJson;
		}),
	getTracks: protectedProcedureWithAccount
		.input(
			z.object({
				playlistId: z.string(),
				cursor: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			let url: string;
			if (!input.cursor) {
				url = `${API_URL}/playlists/${input.playlistId}/tracks?limit=20`;
			} else {
				url = input.cursor;
			}
			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
				method: 'GET',
			});

			const resJson =
				(await res.json()) as SpotifyApi.PlaylistTrackResponse;

			return resJson;
		}),

	getMany: protectedProcedureWithAccount
		.input(z.array(z.string()))
		.query(async ({ ctx, input }) => {
			const playlists = input.map(async (playlistId) => {
				const res = await fetch(`${API_URL}/playlists/${playlistId}`, {
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'GET',
				});
				const resJson =
					(await res.json()) as SpotifyApi.PlaylistObjectFull;
				return resJson;
			});
			const playlistsJson = await Promise.all(playlists);

			return playlistsJson;
		}),
	addTrack: protectedProcedureWithAccount
		.input(
			z.object({
				playlistId: z.string(),
				tracksId: z.array(z.string()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/playlists/${input.playlistId}/tracks`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'POST',
					body: JSON.stringify({
						uris: input.tracksId.map(
							(trackId) => `spotify:track:${trackId}`
						),
					}),
				}
			);
			await checkRes(res, 201);
			return true;
		}),
	removeTrack: protectedProcedureWithAccount
		.input(
			z.object({
				playlistId: z.string(),
				trackId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/playlists/${input.playlistId}/tracks`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'DELETE',
					body: JSON.stringify({
						tracks: [
							{
								uri: `spotify:track:${input.trackId}`,
							},
						],
					}),
				}
			);
			await checkRes(res, 200);
			return true;
		}),
	edit: protectedProcedureWithAccount
		.input(
			z.object({
				playlistId: z.string(),
				body: z.object({
					name: z.string(),
					description: z.string().optional(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/playlists/${input.playlistId}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'PUT',
					body: JSON.stringify(input.body),
				}
			);

			await checkRes(res, 200);
			return true;
		}),
});
