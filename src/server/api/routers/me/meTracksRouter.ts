import { savedTracksRouter } from '@/server/api/routers/me/savedTracks/savedTracksRouter';
import { createTRPCRouter } from '@/server/api/trpc';

export const meTracksRouter = createTRPCRouter({
  saved: savedTracksRouter,
});
