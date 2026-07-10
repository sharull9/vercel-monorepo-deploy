import { db } from "@workspace/db"
import { todo, todoInsertSchema, todoUpdateSchema } from "@workspace/db/schema"
import { eq } from "drizzle-orm"
import z from "zod"
import { publicProcedure } from "../index"
import { filters } from "@workspace/filters"

export const todoRouter = {
  list: publicProcedure
    .route({
      method: "GET",
    })
    .input(filters.query.zod)
    .handler(async () => {
      const results = await db.select().from(todo)
      return results
    }),
  create: publicProcedure
    .route({
      method: "POST",
    })
    .input(todoInsertSchema)
    .handler(async ({ input }) => {
      const result = await db.insert(todo).values(input).returning()
      return result[0]
    }),
  update: publicProcedure
    .route({
      method: "PUT",
    })
    .input(todoUpdateSchema.extend({ id: z.number() }))
    .handler(async ({ input }) => {
      const { id, ...data } = input
      const result = await db
        .update(todo)
        .set(data)
        .where(eq(todo.id, id))
        .returning()
      return result[0]
    }),
  delete: publicProcedure
    .route({
      method: "DELETE",
    })
    .input(
      z.object({
        id: z.number(),
      })
    )
    .handler(async ({ input }) => {
      const result = await db
        .delete(todo)
        .where(eq(todo.id, input.id))
        .returning()
      return result[0]
    }),
}
