import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod"
import z from "zod"
import { timestamps } from "../lib/columns.helpers"

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  ...timestamps,
})

export const userSelectSchema = createSelectSchema(users)
export const userInsertSchema = createInsertSchema(users)
export const userUpdateSchema = createUpdateSchema(users)

export type InsertUserType = z.infer<typeof userInsertSchema>
export type UpdateUserType = z.infer<typeof userUpdateSchema>
export type SelectUserType = z.infer<typeof userSelectSchema>
