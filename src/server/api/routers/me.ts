import { playerRouter } from '@/server/api/routers/me/player';
import { createTRPCRouter } from '@/server/api/trpc';

export const meRouter = createTRPCRouter({
	player: playerRouter,
});
