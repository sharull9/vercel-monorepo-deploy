import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod"
import z from "zod"
import { timestamps } from "../lib/columns.helpers"

export const todo = pgTable("todo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
  ...timestamps,
})

export const todoSelectSchema = createSelectSchema(todo)
export const todoInsertSchema = createInsertSchema(todo)
export const todoUpdateSchema = createUpdateSchema(todo)

export type InsertTodoType = z.infer<typeof todoInsertSchema>
export type UpdateTodoType = z.infer<typeof todoUpdateSchema>
export type SelectTodoType = z.infer<typeof todoSelectSchema>
