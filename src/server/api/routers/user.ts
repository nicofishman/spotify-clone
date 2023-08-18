import { playlistsRouter } from '@/server/api/routers/user/playlists';
import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
	playlists: playlistsRouter,
	get: protectedProcedureWithAccount
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const res = await fetch(`${API_URL}/users/${input}`, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
				method: 'GET',
			});
			const resJson = (await res.json()) as SpotifyApi.UserObjectPublic;
			return resJson;
		}),
});
