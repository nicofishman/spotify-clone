import { checkRes } from '@/server/api/routers/me/player';
import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

export const categoriesRouter = createTRPCRouter({
	getMany: protectedProcedureWithAccount
		.input(
			z
				.object({
					country: z.string().optional(),
					locale: z.string().optional(),
					limit: z.number().optional(),
					offset: z.number().optional(),
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/browse/categories?` +
					new URLSearchParams({
						country: input?.country ?? 'US',
						locale: input?.locale ?? 'en_US',
						limit: input?.limit?.toString() ?? '20',
						offset: input?.offset?.toString() ?? '0',
					}).toString(),
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'GET',
				}
			);

			await checkRes(res, 200);
			return (await res.json()) as SpotifyApi.MultipleCategoriesResponse;
		}),
});
