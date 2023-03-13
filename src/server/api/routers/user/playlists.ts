import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const playlistsRouter = createTRPCRouter({
	list: protectedProcedureWithAccount
		.input(
			z
				.object({
					me: z.literal(true),
				})
				.or(
					z.object({
						id: z.string(),
						me: z.literal(false),
					})
				)
		)
		.query(async ({ ctx, input }) => {
			const { access_token, providerAccountId: id } = ctx.session.account;

			if (!access_token) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'No access token found',
				});
			}

			if (!input.me && !input.id) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No id provided',
				});
			}

			const idToUse = input.me ? id : input.id;

			if (!idToUse) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No id provided',
				});
			}

			const res = await fetch(`${API_URL}/users/${idToUse}/playlists`, {
				// auth header
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});

			if (!res.ok) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong',
				});
			}

			const data =
				(await res.json()) as SpotifyApi.ListOfUsersPlaylistsResponse;

			return data;
		}),
});
