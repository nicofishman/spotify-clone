import { playlistsRouter } from '@/server/api/routers/user/playlists';
import { createTRPCRouter } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
	playlists: playlistsRouter,
});
