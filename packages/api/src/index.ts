import { os } from "@orpc/server"
import { Context } from "./context"

export const o = os.$context<Context>()

export const publicProcedure = o
