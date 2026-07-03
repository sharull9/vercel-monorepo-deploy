import { QueryProvider } from "@/src/providers/query.provider"
import { ThemeProvider } from "@/src/providers/theme.provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  )
}
