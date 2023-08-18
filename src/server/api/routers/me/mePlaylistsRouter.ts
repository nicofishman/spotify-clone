import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';

export const mePlaylistsRouter = createTRPCRouter({
	get: protectedProcedureWithAccount.query(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/playlists?limit=50`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'GET',
		});

		const resJson =
			(await res.json()) as SpotifyApi.ListOfCurrentUsersPlaylistsResponse;

		return {
			...resJson,
			items: resJson.items.filter(
				(item) =>
					item.collaborative ||
					item.owner.id === ctx.session.account.providerAccountId
			),
		};
	}),
});
