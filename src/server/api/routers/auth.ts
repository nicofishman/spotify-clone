import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { getAccessToken } from '@/utils/spotify';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authRouter = createTRPCRouter({
	getMe: publicProcedure
		.input(
			z.object({
				id: z.string().nullish(),
			})
		)
		.query(async ({ ctx, input }) => {
			if (!input.id) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'No user id provided',
				});
			}
			const account = await ctx.prisma.account.findFirstOrThrow({
				where: {
					userId: input.id,
				},
			});
			if (!account.refresh_token) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'No refresh token found',
				});
			}
			return getAccessToken(account);
		}),
});
