import React from "react"

import { useAtom } from "@reatom/react-v1"
import { AddTodo } from "./AddTodo"
import { TodoList } from "./TodoList"
import { VisibilityFilters } from "./VisibilityFilters"
import { TodosIdsAtom, TodosContentAtom, TodosCompletedAtom } from "./domain"

export function App() {
  // connect reducers lazy
  useAtom(TodosIdsAtom, () => null)
  useAtom(TodosContentAtom, () => null)
  useAtom(TodosCompletedAtom, () => null)

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  )
}
