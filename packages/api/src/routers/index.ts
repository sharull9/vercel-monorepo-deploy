import { RouterClient } from "@orpc/server"
import { publicProcedure } from "../index"
import { usersRouter } from "./users"

export const appRouter = {
  healthCheck: publicProcedure.handler(() => "OK"),
  users: usersRouter,
}

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
