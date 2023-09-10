import { checkRes } from '@/server/api/routers/me/player';
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

			const url =
				`${API_URL}/users/${idToUse}/playlists?` +
				new URLSearchParams({
					offset: '0',
					limit: '50',
				}).toString();

			const res = await fetch(url, {
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
	featured: protectedProcedureWithAccount.query(async ({ ctx }) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const now = new Date().toISOString().split('.')[0]!;

		const settings = {
			locale: 'es_AR',
			country: 'AR',
			timestamp: now,
		};
		const res = await fetch(
			`${API_URL}/browse/featured-playlists?` +
				new URLSearchParams(settings).toString(),
			{
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
			}
		);

		await checkRes(res, 200);
		const data =
			(await res.json()) as SpotifyApi.ListOfFeaturedPlaylistsResponse;
		return data;
	}),
	unfollow: protectedProcedureWithAccount
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(`${API_URL}/playlists/${input}/followers`, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
				method: 'DELETE',
			});
			await checkRes(res, 200);
			return true;
		}),
});
