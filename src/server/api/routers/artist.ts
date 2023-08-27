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
});
