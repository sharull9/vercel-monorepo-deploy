import {
    environmentManager,
    type FetchQueryOptions,
    QueryClient
} from "@tanstack/react-query"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000, // 1 hour
        retry: 0,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function prefetch<T>(
  queryOptions: FetchQueryOptions<T, Error, T, string[]>
) {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(queryOptions)
}
