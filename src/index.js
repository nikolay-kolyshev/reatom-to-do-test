// github.com/artalar/reatom

import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "@reatom/core-v1"

import { context, useAtom } from "@reatom/react-v1"
import { useReduxDevTool } from "./shared"
import { Auth, IsAuthAtom, App } from "./features"

import "./styles.css"

const { Provider } = context

function Context() {
  const store = createStore(
    // all reducer will initiate lazy
    undefined,
    JSON.parse(localStorage.getItem("app_store")) || {}
  )

  React.useEffect(() => {
    return store.subscribe(() =>
      localStorage.setItem("app_store", JSON.stringify(store.getState()))
    )
  })

  return (
    <Provider value={store}>
      <Root />
    </Provider>
  )
}

function Root() {
  useReduxDevTool()
  // useStoreLog()

  const isAuth = useAtom(IsAuthAtom)

  return isAuth ? <App /> : <Auth />
}

ReactDOM.render(<Context />, document.getElementById("root1"))
