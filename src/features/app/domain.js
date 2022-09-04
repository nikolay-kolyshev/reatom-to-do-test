import {
  declareAction,
  declareAtom as _declareAtom,
  map as _map,
  combine as _combine
} from "@reatom/core-v1"

export { declareAction }

export function declareAtom(name, initialState, handler) {
  return arguments.length === 3
    ? _declareAtom(["app/" + name], initialState, handler)
    : _declareAtom(name, initialState)
}
export function map(name, target, mapper) {
  return arguments.length === 3
    ? _map(["app/" + name], target, mapper)
    : _map(name, target)
}
export function combine(name, shape) {
  return arguments.length === 2
    ? _combine(["app/" + name], shape)
    : _combine(name)
}

export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
}

let nextTodoId = Math.random()
function getId() {
  return (++nextTodoId).toString(36)
}
export const _addTodo = declareAction("addTodo")

export const addTodo = Object.assign(
  (content) =>
    _addTodo({
      id: getId(),
      content
    }),
  _addTodo
)
export const toggleTodo = declareAction("toggleTodo")

export const TodosIdsAtom = declareAtom(
  "todosIds", // name
  [], // initial state
  (on) => on(addTodo, (state, { id }) => [...state, id])
)

export const TodosContentAtom = declareAtom(
  "todosContent", // name
  {}, // initial state
  (on) => on(addTodo, (state, { id, content }) => ({ ...state, [id]: content }))
)

export const TodosCompletedAtom = declareAtom(
  "todosCompleted", // name
  {}, // initial state
  (on) => [
    on(addTodo, (state, { id }) => ({ ...state, [id]: false })),
    on(toggleTodo, (state, id) => ({ ...state, [id]: !state[id] }))
  ]
)
