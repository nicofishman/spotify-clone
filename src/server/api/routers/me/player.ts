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
	play: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/play`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'PUT',
		});
		await checkRes(res);
	}),
	pause: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/pause`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'PUT',
		});

		await checkRes(res);
	}),
	next: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/next`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'POST',
		});
		await checkRes(res);
	}),
	previous: protectedProcedureWithAccount.mutation(async ({ ctx }) => {
		const res = await fetch(`${API_URL}/me/player/previous`, {
			headers: {
				Authorization: `Bearer ${ctx.session.account.access_token}`,
			},
			method: 'POST',
		});
		await checkRes(res);
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
			await checkRes(res);
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
			await checkRes(res);
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
			await checkRes(res);
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
			await checkRes(res);
		}),
});

const checkRes = async (res: Response) => {
	if (res.status !== 204) {
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
