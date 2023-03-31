import { categoriesRouter } from '@/server/api/routers/browse/categories';
import { createTRPCRouter } from '@/server/api/trpc';

export const browseRouter = createTRPCRouter({
	categories: categoriesRouter,
});
