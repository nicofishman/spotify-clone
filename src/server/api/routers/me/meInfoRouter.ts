import {
  createTRPCRouter,
  protectedProcedureWithAccount,
} from '@/server/api/trpc';

export const meInfoRouter = createTRPCRouter({
  get: protectedProcedureWithAccount.query(({ ctx }) => {
    return ctx.session.user;
  }),
});
