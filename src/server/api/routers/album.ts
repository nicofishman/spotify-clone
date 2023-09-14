import {
  createTRPCRouter,
  protectedProcedureWithAccount,
} from '@/server/api/trpc';
import { API_URL } from '@/utils/spotify';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const albumRouter = createTRPCRouter({
  get: protectedProcedureWithAccount
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const res = await fetch(`${API_URL}/albums/${input}`, {
        headers: {
          Authorization: `Bearer ${ctx.session.account.access_token}`,
        },
        method: 'GET',
      });

      const resJson =
				(await res.json()) as SpotifyApi.SingleAlbumResponse;

      if (!resJson.artists[0]?.id) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Album not found',
        });
      }

      const artist = await fetch(
        `${API_URL}/artists/${resJson.artists[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session.account.access_token}`,
          },
          method: 'GET',
        }
      );

      const artistJson =
				(await artist.json()) as SpotifyApi.SingleArtistResponse;

      const resAlbumLiked = await fetch(
        `${API_URL}/me/albums/contains?ids=${input}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session.account.access_token}`,
          },
          method: 'GET',
        }
      );

      const resAlbumLikedJson =
				(await resAlbumLiked.json()) as SpotifyApi.CheckUserSavedAlbumsResponse;

      if (resAlbumLikedJson[0] === undefined) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Album not found 22',
          cause: resAlbumLikedJson,
        });
      }

      return {
        ...resJson,
        artists: [
          {
            ...resJson.artists[0],
            images: artistJson.images,
          },
        ],
        isLiked: resAlbumLikedJson[0],
      };
    }),
  getTracks: protectedProcedureWithAccount
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const res = await fetch(
        `${API_URL}/albums/${input}/tracks?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session.account.access_token}`,
          },
          method: 'GET',
        }
      );

      const resJson =
				(await res.json()) as SpotifyApi.AlbumTracksResponse;

      return resJson;
    }),
});
