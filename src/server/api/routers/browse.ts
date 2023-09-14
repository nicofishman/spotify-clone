import { categoriesRouter } from '@/server/api/routers/browse/categories';
import { queryRouter } from '@/server/api/routers/browse/query';
import { createTRPCRouter } from '@/server/api/trpc';

export const browseRouter = createTRPCRouter({
  categories: categoriesRouter,
  query: queryRouter,
});
