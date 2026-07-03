import type { Context as HonoContext } from "hono"

interface CreateContextOptions {
  context: HonoContext
}

export async function createContext({ context }: CreateContextOptions) {
  return {
    auth: null,
    session: null,
    headers: context.req.raw.headers,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
