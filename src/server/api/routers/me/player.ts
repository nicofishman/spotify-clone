import {
	createTRPCRouter,
	protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const playerRouter = createTRPCRouter({
	currentlyPlaying: protectedProcedureWithAccount.query(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
		});

		if (res.status === 204) {
			return {
				available: false,
				item: null,
			} as SpotifyApi.CurrentPlaybackResponse & {
				available: false;
			};
		}
		const resJson =
			(await res.json()) as SpotifyApi.CurrentPlaybackResponse;

		if (res.status === 204) {
			return {
				available: true,
				is_playing: false,
				item: null,
			} as SpotifyApi.CurrentPlaybackResponse & {
				available: true;
			};
		}

		if (res.status !== 200) {
			const error = resJson as unknown as {
				message: string;
				status: number;
			};

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Status code ${res.status}: ${error.message}`,
			});
		}
		return {
			available: true,
			...resJson,
		};
	}),
	play: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/play`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'PUT',
		});
		await checkRes(res, 204);
	}),
	pause: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/pause`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'PUT',
		});

		await checkRes(res, 204);
	}),
	next: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/next`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'POST',
		});
		await checkRes(res, 204);
	}),
	previous: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/previous`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'POST',
		});
		await checkRes(res, 204);
	}),
	seek: protectedProcedureWithAccount
		.input(z.number())
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/me/player/seek?position_ms=${input}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'PUT',
				}
			);
			await checkRes(res, 204);
		}),
	shuffle: protectedProcedureWithAccount
		.input(z.boolean())
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/me/player/shuffle?state=${
					input ? 'true' : 'false'
				}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'PUT',
				}
			);

			await checkRes(res, 204);
		}),
	repeat: protectedProcedureWithAccount
		.input(z.enum(['track', 'off']))
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/me/player/repeat?state=${input}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'PUT',
				}
			);
			await checkRes(res, 204);
		}),
	volume: protectedProcedureWithAccount
		.input(z.number().min(0).max(100))
		.mutation(async ({ ctx, input }) => {
			const res = await fetch(
				`${API_URL}/me/player/volume?volume_percent=${input}`,
				{
					headers: {
						Authorization: `Bearer ${ctx.session.account.access_token}`,
					},
					method: 'PUT',
				}
			);
			await checkRes(res, 204);
		}),
	queue: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/queue`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'GET',
		});
		await checkRes(res, 200);
	}),
	recentlyPlayed: protectedProcedureWithAccount.query(async ({ ctx }) => {
		// get the 6 most recent playlists heard
		const res = await fetch(
			`${API_URL}/me/player/recently-played?limit=50`,
			{
				headers: {
					Authorization: `Bearer ${ctx.session.account.access_token}`,
				},
				method: 'GET',
			}
		);
		await checkRes(res, 200);
		return ((await res.json()) ??
			{}) as SpotifyApi.UsersRecentlyPlayedTracksResponse;
	}),
	addToQueue: protectedProcedureWithAccount
		.input(z.array(z.string()))
		.mutation(async ({ ctx, input }) => {
			for (const uri of input) {
				const res = await fetch(
					`${API_URL}/me/player/queue?uri=${uri}`,
					{
						headers: {
							Authorization: `Bearer ${ctx.session.account.access_token}`,
						},
						method: 'POST',
					}
				);
				await checkRes(res, 204);
			}
		}),
});

export const checkRes = async (res: Response, status: number) => {
	if (res.status !== status) {
		const error = (await res.json()) as {
			message: string;
			status: number;
		};
		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: `Status code ${res.status}: ${error.message}`,
		});
	}
};
