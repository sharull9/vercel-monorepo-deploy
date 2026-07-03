import { onError } from "@orpc/server"
import { RPCHandler } from "@orpc/server/fetch"
import { createContext } from "@workspace/api/context"
import { appRouter } from "@workspace/api/routers"
import "dotenv/config"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()
app.use(
  "/*",
  cors({
    origin: (process.env.CORS_ORIGIN || "").split(","),
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "x-tenant-id"],
    credentials: true,
  })
)
const handler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

app.get("/", (c) => {
  return c.text("Hello From the Hono API!!!")
})

app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: await createContext({ context: c }),
  })
  if (matched) return c.newResponse(response.body, response)
  await next()
})

export default app
