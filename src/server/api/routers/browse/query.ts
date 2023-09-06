import { searchFilters } from '@/components/Search/SearchResults';
import { checkRes } from '@/server/api/routers/me/player';
import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

function zodEnumFromObjKeys<K extends string>(
	obj: Record<K, unknown>
): z.ZodEnum<[K, ...K[]]> {
	const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return z.enum([firstKey!, ...otherKeys]);
}

const keysEnum = zodEnumFromObjKeys(searchFilters);

export const queryRouter = createTRPCRouter({
	get: protectedProcedureWithAccount
		.input(
			z.object({
				query: z.string(),
				filter: z.array(keysEnum),
			})
		)
		.query(async ({ ctx, input }) => {
			const filterToArray = (filter: (typeof input)['filter']) => {
				if (filter[0] === 'all') {
					return [
						'album',
						'artist',
						'playlist',
						'track',
						'audiobook',
						'show',
						'episode',
					];
				} else {
					return filter;
				}
			};

			const url =
				`${API_URL}/search?` +
				new URLSearchParams({
					q: input.query,
					type: filterToArray(input.filter).join(','),
					limit: '50',
				}).toString();

			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
				method: 'GET',
			});

			await checkRes(res, 200);

			const resJson = (await res.json()) as SpotifyApi.SearchResponse;

			return resJson;
		}),
});
