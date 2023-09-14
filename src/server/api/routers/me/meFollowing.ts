import { checkRes } from '@/server/api/routers/me/player';
import {
  createTRPCRouter,
  protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { z } from 'zod';

export const meFollowingRouter = createTRPCRouter({
  getArtists: protectedProcedureWithAccount.query(async ({ ctx }) => {
    const res = await fetch(`${API_URL}/me/following?type=artist&limit=50`, {
      headers: {
        Authorization: `Bearer ${ctx.session.account.access_token}`,
      },
    });
    const json = (await res.json()) as SpotifyApi.UsersFollowedArtistsResponse;

    return json.artists.items.map((artist) => artist.id);
  }),
  followArtists: protectedProcedureWithAccount
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const res = await fetch(
        `${API_URL}/me/following?type=artist&ids=${input.join(',')}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${ctx.session.account.access_token}`,
          },
          body: JSON.stringify({
            ids: input,
          }),
        }
      );

      await checkRes(res, 204);
    }),
  unfollowArtists: protectedProcedureWithAccount
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const res = await fetch(
        `${API_URL}/me/following?type=artist&ids=${input.join(',')}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${ctx.session.account.access_token}`,
          },
          body: JSON.stringify({
            ids: input,
          }),
        }
      );

      await checkRes(res, 204);
    }),
});
