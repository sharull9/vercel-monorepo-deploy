import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server"
import z from "zod"

const paginationSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
}

const paginationZodSchema = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
})

const paginationLoader = createLoader(paginationSearchParams)

const sortSearchParams = {
  sortBy: parseAsString.withDefault(""),
  sortOrder: parseAsStringLiteral(["asc", "desc"] as const).withDefault("desc"),
}

const sortZodSchema = z.object({
  sortBy: z.string().optional().default(""),
  page: z.enum(["asc", "desc"]).default("desc"),
})

const sortLoader = createLoader(sortSearchParams)

const querySearchParams = {
  search: parseAsString.withDefault(""),
  filterBy: parseAsString.withDefault(""),
  filterValue: parseAsString.withDefault(""),
}

const queryZodSchema = z.object({
  search: z.string().optional().default(""),
  filterBy: z.string().optional().default(""),
  filterValue: z.string().optional().default(""),
})

const queryLoader = createLoader(querySearchParams)

export const filters = {
  pagination: {
    loader: paginationLoader,
    searchParams: paginationSearchParams,
    zod: paginationZodSchema,
  },
  sort: {
    loader: sortLoader,
    searchParams: sortSearchParams,
    zod: sortZodSchema,
  },
  query: {
    loader: queryLoader,
    searchParams: querySearchParams,
    zod: queryZodSchema,
  },
}
