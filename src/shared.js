import React, { useEffect, useRef, useContext } from "react"
import { context } from "@reatom/react-v1"
import { createStore as createReduxStore } from "redux"
import { devToolsEnhancer } from "redux-devtools-extension"

// ---------------------------------------
// this code will moved to other packages
// ---------------------------------------

function useUnsubscribe(ref) {
  useEffect(
    () => () => {
      ref.current()
    },
    [ref]
  )
}

export function useStoreLog() {
  const store = React.useContext(context)
  React.useEffect(() => {
    let stateLast = store.getState()
    const u = store.subscribe(() => {
      const stateNew = store.getState()

      console.groupCollapsed("store update")
      Object.keys(stateNew).forEach((domainName) => {
        const domainState = stateNew[domainName]
        const domainStateLast = stateLast[domainName] || {}

        const changes = Object.keys(domainState)
          .map((key) => [domainState[key], domainStateLast[key], key])
          .filter(([a, b]) => a !== b)

        if (changes.length === 0) return

        console.groupCollapsed(domainName, "[domain]")
        changes.forEach(([domainState, domainStateLast, key]) => {
          if (domainStateLast === undefined) {
            console.log(`%cNEW:`, "color: green", domainState)
          } else {
            console.groupCollapsed(key)
            console.log(`%cWAS:`, "color: gray", domainStateLast)
            console.log(`%cHAS:`, "color: green", domainState)
            console.groupEnd()
          }
        })
        console.groupEnd()
      })
      console.log("STATE", stateNew)
      console.groupEnd()

      stateLast = stateNew
    })

    return u
  }, [])
}

export function useReduxDevTool() {
  const store = useContext(context)

  const subscribtionRef = useRef(null)

  if (subscribtionRef.current === null) {
    const redux = createReduxStore(
      (_, { state }) => state || {},
      devToolsEnhancer()
    )
    let isDispatchingReatom = false
    let isDispatchingRedux = false

    const storeUnsubscribe = store.subscribe(({ type, payload }) => {
      if (isDispatchingRedux) return
      isDispatchingReatom = true
      redux.dispatch({ type, payload, state: store.getState() })
      isDispatchingReatom = false
    })
    const reduxUnsubscribe = redux.subscribe(() => {
      if (isDispatchingReatom) return
      isDispatchingRedux = true
      store.replaceState(redux.getState())
      isDispatchingRedux = false

      console.log("redux", redux.getState())
      console.log("store", store.getState())
    })

    subscribtionRef.current = () => {
      storeUnsubscribe()
      reduxUnsubscribe()
    }
  }

  useUnsubscribe(subscribtionRef)
}

// export function connect(atom, render) {
//   if (
//     (typeof atom !== 'function' && atom !== null) ||
//     typeof render !== 'function'
//   ) {
//     throw new TypeError('Invalid arguments')
//   }
//   return class extends React.Component {
//     static contextType = context

//     constructor(...a) {
//       super(...a)
//       const initialProps = a[0]

//       if (atom !== null) {
//         this.atom = atom(initialProps)
//         this.state = {
//           value: this.context.getState(this.atom),
//         }
//       }
//     }

//     componentDidMount() {
//       if (atom !== null) {
//         this.unsubscribe = this.context.subscribe(
//           newState => this.setState({ value: newState }),
//           this.atom,
//         )
//       }
//     }
//     componentWillUnmount() {
//       if (atom !== null) {
//         this.unsubscribe()
//       }
//     }

//     render() {
//       return render(
//         this.props,
//         this.state ? this.state.value : {},
//         this.context.dispatch,
//       )
//     }
//   }
// }
