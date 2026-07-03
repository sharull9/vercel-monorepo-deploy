"use client"
import { orpc } from "@/src/lib/orpc"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  const response = useQuery(orpc.healthCheck.queryOptions())

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div>
          <Link href="/todo" className="underline">
            Todo CRUD example
          </Link>
        </div>
        <div>{response.data}</div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
