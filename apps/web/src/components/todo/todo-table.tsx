"use client"

import { orpc } from "@/lib/orpc"
import type { SelectTodoType } from "@workspace/db/schema"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
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
import { useQueryStates } from "nuqs"
import { filters } from "@workspace/filters"
import { SearchIcon, XIcon } from "lucide-react"

export function TodoTable({
  onEdit,
  onDelete,
}: {
  onEdit: (todo: SelectTodoType) => void
  onDelete: (todo: SelectTodoType) => void
}) {
  const [query, setQuery] = useQueryStates(filters.query.searchParams)
  const { data, isLoading, isError, error } = useQuery(
    orpc.todo.list.queryOptions({ input: { ...query } })
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
    <>
      <InputGroup>
        <InputGroupInput
          value={query.search}
          onChange={(e) => {
            setQuery({ search: e.target.value })
          }}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => {
              setQuery({ search: "", filterBy: "", filterValue: "" })
            }}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(todo)}
                >
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
    </>
  )
}
