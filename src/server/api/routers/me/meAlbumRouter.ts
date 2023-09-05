import { z } from 'zod';
import { protectedProcedureWithAccount } from '../../trpc';
import { createTRPCRouter } from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { checkRes } from '@/server/api/routers/me/player';

export const meAlbumRouter = createTRPCRouter({
	add: protectedProcedureWithAccount
		.input(z.array(z.string()).max(20))
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/me/albums?ids=${input.join(',')}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'PUT',
				}
			);
			await checkRes(res, 200);
		}),
	remove: protectedProcedureWithAccount
		.input(z.array(z.string()).max(20))
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/me/albums?ids=${input.join(',')}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'DELETE',
				}
			);
			await checkRes(res, 200);
		}),
	get: protectedProcedureWithAccount.query(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/albums?limit=50`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
		});

		await checkRes(res, 200);
		const resJson =
			(await res.json()) as SpotifyApi.UsersSavedAlbumsResponse;

		while (resJson.next) {
			const nextRes = await fetch(resJson.next, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
			});
			await checkRes(nextRes, 200);
			const nextResJson =
				(await nextRes.json()) as SpotifyApi.UsersSavedAlbumsResponse;
			resJson.items.push(...nextResJson.items);
			resJson.next = nextResJson.next;
		}

		return resJson.items.map((item) => item.album);
	}),
});
