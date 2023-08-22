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
});
