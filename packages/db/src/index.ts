import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import relations from "./relations"
import { env } from "@workspace/env/api"


export const db = drizzle(env.DATABASE_URL!, {
  relations,
})
