import { QueryProvider } from "@/src/providers/query.provider"
import { ThemeProvider } from "@/src/providers/theme.provider"
import { Toaster } from "@workspace/ui/components/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  )
}
