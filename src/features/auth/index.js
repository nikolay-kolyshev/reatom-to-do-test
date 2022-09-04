import React from "react"
import { declareAction, declareAtom } from "@reatom/core-v1"

import { useAtom, useAction } from "@reatom/react-v1"

export const onSubmit = declareAction("onSubmit")
export const IsAuthAtom = declareAtom(["isAuth"], false, (on) => [
  on(onSubmit, () => true)
])

export function Auth() {
  // connect reducers lazy
  useAtom(IsAuthAtom, () => null)
  const handleSubmit = useAction((e) => (e.preventDefault(), onSubmit()))

  return (
    <form onSubmit={handleSubmit}>
      <h4>Fake auth</h4>
      <button type="submit">Accept</button>
    </form>
  )
}
