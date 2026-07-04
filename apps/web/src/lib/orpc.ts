import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import type { RouterClient } from "@orpc/server"
import { createTanstackQueryUtils } from "@orpc/tanstack-query"
import type { AppRouter } from "@workspace/api/routers"
import { env } from "@workspace/env/web"

const link = new RPCLink({
  url: `${env.NEXT_PUBLIC_SERVER_URL}/rpc`,
})

export const client: RouterClient<AppRouter> = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)
