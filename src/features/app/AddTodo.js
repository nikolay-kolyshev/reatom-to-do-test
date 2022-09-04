import React from "react"

import { useAtom, useAction } from "@reatom/react-v1"
import { declareAction, declareAtom, addTodo } from "./domain"

export const onChange = declareAction("onChange")
export const InputAtom = declareAtom("input", "", (on) => [
  on(onChange, (state, value) => value),
  on(addTodo, () => "")
])

export function AddTodo() {
  const input = useAtom(InputAtom)
  const handleChange = useAction((e) => onChange(e.target.value))
  const handleSubmit = useAction(
    (e) => {
      e.preventDefault()
      if (input.length !== 0) return addTodo(input)
    },
    [input]
  )

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={input} />
      <button className="add-todo" type="submit">
        Add Todo
      </button>
    </form>
  )
}
