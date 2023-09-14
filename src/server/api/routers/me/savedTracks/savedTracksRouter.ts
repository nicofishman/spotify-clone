import {
  createTRPCRouter,
  protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

export const savedTracksRouter = createTRPCRouter({
  get: protectedProcedureWithAccount.query(async ({ ctx }) => {
    const res = await fetch(`${API_URL}/me/tracks`, {
      headers: {
        Authorization: `Bearer ${ctx.session.account.access_token}`,
      },
      method: 'GET',
    });
    const resJson =
			(await res.json()) as SpotifyApi.UsersSavedTracksResponse;

    const tracksRes = await fetch(
      `${API_URL}/me/tracks?limit=${
        resJson.total > 50 ? 50 : resJson.total
      }`,
      {
        headers: {
          Authorization: `Bearer ${ctx.session.account.access_token}`,
        },
        method: 'GET',
      }
    );

    const trackJson =
			(await tracksRes.json()) as SpotifyApi.UsersSavedTracksResponse;

    while (trackJson.next) {
      const nextRes = await fetch(trackJson.next, {
        headers: {
          Authorization: `Bearer ${ctx.session.account.access_token}`,
        },
        method: 'GET',
      });
      const nextJson =
				(await nextRes.json()) as SpotifyApi.UsersSavedTracksResponse;
      trackJson.items.push(...nextJson.items);
      trackJson.next = nextJson.next;
    }

    return trackJson;
  }),
  add: protectedProcedureWithAccount
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const res = await fetch(`${API_URL}/me/tracks?ids=${input}`, {
        headers: {
          Authorization: `Bearer ${ctx.session.account.access_token}`,
        },
        method: 'PUT',
      });
      if (res.status === 200) {
        return true;
      } else {
        throw new Error('Failed to add track to saved tracks');
      }
    }),
  remove: protectedProcedureWithAccount
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const res = await fetch(`${API_URL}/me/tracks?ids=${input}`, {
        headers: {
          Authorization: `Bearer ${ctx.session.account.access_token}`,
        },
        method: 'DELETE',
      });
      if (res.status === 200) {
        return true;
      } else {
        throw new Error('Failed to remove track from saved tracks');
      }
    }),
});
