"use client"

import { orpc } from "@/src/lib/orpc"
import type { SelectTodoType } from "@workspace/db/schema"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function DeleteTodoDialog({
  todo,
  open,
  onOpenChange,
}: {
  todo?: SelectTodoType
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.todo.list.queryKey() })
        toast.success("Todo deleted")
        onOpenChange(false)
      },
      onError: (error: Error) => toast.error(error.message),
    })
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete todo</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{todo?.title}&quot;? This
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={deleteMutation.isPending}
            onClick={() => todo && deleteMutation.mutate({ id: todo.id })}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
