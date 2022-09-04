import React from "react"

import { useAtom } from "@reatom/react-v1"
import {
  VISIBILITY_FILTERS,
  declareAtom,
  combine,
  TodosIdsAtom,
  TodosCompletedAtom
} from "./domain"
import { VisibilityFilterAtom } from "./VisibilityFilters"
import { Todo } from "./Todo"

export const TodosIdsVisibleAtom = declareAtom(
  "todosIdsVisible", // name
  [], // initial state
  (on) =>
    on(
      combine([TodosIdsAtom, TodosCompletedAtom, VisibilityFilterAtom]),
      (state, [ids, byCompleted, filter]) => {
        switch (filter) {
          case VISIBILITY_FILTERS.COMPLETED:
            return ids.filter((id) => byCompleted[id])
          case VISIBILITY_FILTERS.INCOMPLETE:
            return ids.filter((id) => !byCompleted[id])
          case VISIBILITY_FILTERS.ALL:
          default:
            return ids
        }
      }
    )
)

export function TodoList() {
  const todosIds = useAtom(TodosIdsVisibleAtom)

  return (
    <ul className="todo-list">
      {todosIds.length
        ? todosIds.map((id) => {
            return <Todo key={id} id={id} />
          })
        : "No todos, yay!"}
    </ul>
  )
}
