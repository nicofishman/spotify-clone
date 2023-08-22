import { createTRPCRouter } from '@/server/api/trpc';
import { exampleRouter } from '@/server/api/routers/example';
import { authRouter } from '@/server/api/routers/auth';
import { userRouter } from '@/server/api/routers/user';
import { meRouter } from '@/server/api/routers/me';
import { playlistRouter } from '@/server/api/routers/playlist';
import { browseRouter } from '@/server/api/routers/browse';
import { albumRouter } from '@/server/api/routers/album';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	auth: authRouter,
	user: userRouter,
	me: meRouter,
	playlist: playlistRouter,
	browse: browseRouter,
	album: albumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
