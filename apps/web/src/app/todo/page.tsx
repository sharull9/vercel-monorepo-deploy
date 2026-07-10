"use client"

import { DeleteTodoDialog } from "@/components/todo/delete-todo-dialog"
import { TodoFormDialog } from "@/components/todo/todo-form-dialog"
import { TodoTable } from "@/components/todo/todo-table"
import type { SelectTodoType } from "@workspace/db/schema"
import { Button } from "@workspace/ui/components/button"
import { Suspense, useState } from "react"

export default function TodoPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [selectedTodo, setSelectedTodo] = useState<SelectTodoType>()
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-medium">Todos</h1>
        <Button
          onClick={() => {
            setFormMode("create")
            setSelectedTodo(undefined)
            setFormOpen(true)
          }}
        >
          Add todo
        </Button>
      </div>
      <Suspense>
        <TodoTable
          onEdit={(todo) => {
            setFormMode("edit")
            setSelectedTodo(todo)
            setFormOpen(true)
          }}
          onDelete={(todo) => {
            setSelectedTodo(todo)
            setDeleteOpen(true)
          }}
        />
      </Suspense>
      <TodoFormDialog
        key={selectedTodo?.id ?? "create"}
        mode={formMode}
        todo={selectedTodo}
        open={formOpen}
        onOpenChange={setFormOpen}
      />
      <DeleteTodoDialog
        todo={selectedTodo}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  )
}
