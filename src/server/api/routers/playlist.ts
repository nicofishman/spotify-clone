import { createTRPCRouter } from '@/server/api/trpc';
import { protectedProcedureWithAccount } from './../trpc';
import { z } from 'zod';
import { API_URL } from '@/utils/spotify';

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
});
