import { meAlbumRouter } from '@/server/api/routers/me/meAlbumRouter';
import { mePlaylistsRouter } from '@/server/api/routers/me/mePlaylistsRouter';
import { meTracksRouter } from '@/server/api/routers/me/meTracksRouter';
import { playerRouter } from '@/server/api/routers/me/player';
import { createTRPCRouter } from '@/server/api/trpc';

export const meRouter = createTRPCRouter({
	player: playerRouter,
	tracks: meTracksRouter,
	playlists: mePlaylistsRouter,
	album: meAlbumRouter,
});
