import { db } from "@workspace/db"
import { userInsertSchema, users, userUpdateSchema } from "@workspace/db/schema"
import { eq, isNotNull } from "drizzle-orm"
import z from "zod"
import { publicProcedure } from "../index"

export const usersRouter = {
  list: publicProcedure
    .route({
      method: "GET",
    })
    .handler(async () => {
      const results = await db
        .select()
        .from(users)
        .where(isNotNull(users.deleted_at))
      return results
    }),
  create: publicProcedure
    .route({
      method: "POST",
    })
    .input(userInsertSchema)
    .handler(async ({ input }) => {
      const result = await db.insert(users).values(input).returning()
      return result[0]
    }),
  update: publicProcedure
    .route({
      method: "PUT",
    })
    .input(userUpdateSchema)
    .handler(async ({ input }) => {
      const result = await db.update(users).set(input).returning()
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
        .delete(users)
        .where(eq(users.id, input.id))
        .returning()
      return result[0]
    }),
}
