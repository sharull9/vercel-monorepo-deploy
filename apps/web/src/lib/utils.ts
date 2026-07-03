export type RouteMatcher = (path: string) => boolean

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const createRouteMatcher = (routes: string[]): RouteMatcher => {
  const regexRoutes = routes.map((route) => new RegExp(`^${route}$`))
  return (path: string): boolean =>
    regexRoutes.some((regex) => regex.test(path))
}
