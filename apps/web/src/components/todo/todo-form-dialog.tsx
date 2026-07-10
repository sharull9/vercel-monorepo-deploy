"use client"

import { orpc } from "@/lib/orpc"
import type { SelectTodoType } from "@workspace/db/schema"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

export function TodoFormDialog({
  mode,
  todo,
  open,
  onOpenChange,
}: {
  mode: "create" | "edit"
  todo?: SelectTodoType
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [title, setTitle] = useState(todo?.title ?? "")
  const [completed, setCompleted] = useState(todo?.completed ?? false)
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: orpc.todo.list.queryKey() })

  const createMutation = useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        invalidate()
        toast.success("Todo created")
        onOpenChange(false)
      },
      onError: (error: Error) => toast.error(error.message),
    })
  )

  const updateMutation = useMutation(
    orpc.todo.update.mutationOptions({
      onSuccess: () => {
        invalidate()
        toast.success("Todo updated")
        onOpenChange(false)
      },
      onError: (error: Error) => toast.error(error.message),
    })
  )

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "create") {
      createMutation.mutate({ title, completed })
    } else if (todo) {
      updateMutation.mutate({ id: todo.id, title, completed })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Add todo" : "Edit todo"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked === true)}
              />
              <Label htmlFor="completed">Completed</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {mode === "create" ? "Create" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
