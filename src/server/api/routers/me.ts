import { meAlbumRouter } from '@/server/api/routers/me/meAlbumRouter';
import { meFollowingRouter } from '@/server/api/routers/me/meFollowing';
import { meInfoRouter } from '@/server/api/routers/me/meInfoRouter';
import { mePlaylistsRouter } from '@/server/api/routers/me/mePlaylistsRouter';
import { meTracksRouter } from '@/server/api/routers/me/meTracksRouter';
import { playerRouter } from '@/server/api/routers/me/player';
import { createTRPCRouter } from '@/server/api/trpc';

export const meRouter = createTRPCRouter({
  player: playerRouter,
  tracks: meTracksRouter,
  playlists: mePlaylistsRouter,
  album: meAlbumRouter,
  info: meInfoRouter,
  following: meFollowingRouter,
});
