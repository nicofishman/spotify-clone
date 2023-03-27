import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { TRPCError } from '@trpc/server';

export const playerRouter = createTRPCRouter({
	currentlyPlaying: protectedProcedureWithAccount.query(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
		});

		if (res.status === 204) {
			return {
				is_playing: false,
				item: null,
			} as SpotifyApi.CurrentPlaybackResponse;
		}

		if (res.status !== 200) {
			const error = (await res.json()) as {
				message: string;
				status: number;
			};

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Status code ${res.status}: ${error.message}`,
			});
		}

		return ((await res.json()) ?? {}) as SpotifyApi.CurrentPlaybackResponse;
	}),
});
