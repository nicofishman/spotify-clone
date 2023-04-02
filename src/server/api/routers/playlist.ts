import { createTRPCRouter } from '@/server/api/trpc';
import { protectedProcedureWithAccount } from './../trpc';
import { z } from 'zod';
import { API_URL } from '@/utils/spotify';
import { checkRes } from '@/server/api/routers/me/player';

export const playlistRouter = createTRPCRouter({
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
	addSong: protectedProcedureWithAccount
		.input(
			z.object({
				playlistId: z.string(),
				songId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/playlists/${input.playlistId}/tracks?uris=spotify:track:${input.songId}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'POST',
				}
			);
			await checkRes(res, 201);
			return true;
		}),
});
