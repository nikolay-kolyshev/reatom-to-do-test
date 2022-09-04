import React from "react"
import cx from "classnames"

import { useAtom, useAction } from "@reatom/react-v1"
import { map, toggleTodo, TodosContentAtom, TodosCompletedAtom } from "./domain"

export function Todo({ id }) {
  const content = useAtom(
    map(
      `todo #${id} content`,
      TodosContentAtom,
      (todosContent) => todosContent[id] || ""
    )
  )
  const completed = useAtom(
    map(
      `todo #${id} completed`,
      TodosCompletedAtom,
      (todosCompleted) => todosCompleted[id] || false
    )
  )
  const handleClick = useAction(() => toggleTodo(id))

  return (
    <li className="todo-item" onClick={handleClick}>
      {completed ? "👌" : "👋"}{" "}
      <span
        className={cx(
          "todo-item__text",
          completed && "todo-item__text--completed"
        )}
      >
        {content}
      </span>
    </li>
  )
}
