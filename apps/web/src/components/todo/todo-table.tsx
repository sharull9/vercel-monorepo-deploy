"use client"

import { orpc } from "@/src/lib/orpc"
import type { SelectTodoType } from "@workspace/db/schema"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function TodoTable({
  onEdit,
  onDelete,
}: {
  onEdit: (todo: SelectTodoType) => void
  onDelete: (todo: SelectTodoType) => void
}) {
  const { data, isLoading, isError, error } = useQuery(
    orpc.todo.list.queryOptions()
  )
  const queryClient = useQueryClient()

  const toggleMutation = useMutation(
    orpc.todo.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.todo.list.queryKey() })
      },
      onError: (error: Error) => toast.error(error.message),
    })
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={3}>Loading todos…</TableCell>
          </TableRow>
        )}
        {isError && (
          <TableRow>
            <TableCell colSpan={3} className="text-destructive">
              {error.message}
            </TableCell>
          </TableRow>
        )}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={3}>
              No todos yet. Click &quot;Add todo&quot; to create one.
            </TableCell>
          </TableRow>
        )}
        {data?.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) =>
                  toggleMutation.mutate({
                    id: todo.id,
                    completed: checked === true,
                  })
                }
              />
            </TableCell>
            <TableCell className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </TableCell>
            <TableCell className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(todo)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(todo)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
