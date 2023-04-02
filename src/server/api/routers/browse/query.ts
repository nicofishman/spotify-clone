import { type searchFiltersKeys } from '@/components/Search/SearchResults';
import { checkRes } from '@/server/api/routers/me/player';
import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

export const queryRouter = createTRPCRouter({
	get: protectedProcedureWithAccount
		.input(
			z.object({
				query: z.string(),
				filter: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const filterToArray = (
				filter: (typeof searchFiltersKeys)[number]
			) => {
				switch (filter) {
					case 'album':
						return ['album'];
					case 'artist':
						return ['artist'];
					case 'playlist':
						return ['playlist'];
					case 'track':
						return ['track'];
					default:
						return [
							'album',
							'artist',
							'playlist',
							'track',
							'audiobook',
							'show',
							'episode',
						];
				}
			};
			const res = await fetch(
				`${API_URL}/search?` +
					new URLSearchParams({
						q: input.query,
						type: filterToArray(
							(input.filter as (typeof searchFiltersKeys)[number]) ??
								'all'
						).join(','),
					}).toString(),
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'GET',
				}
			);

			await checkRes(res, 200);

			return (await res.json()) as SpotifyApi.SearchResponse;
		}),
});
