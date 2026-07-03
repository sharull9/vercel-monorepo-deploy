import { timestamp } from "drizzle-orm/pg-core"

// columns.helpers.ts
export const timestamps = {
  updated_at: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
  created_at: timestamp().notNull().defaultNow(),
  deleted_at: timestamp(),
}
