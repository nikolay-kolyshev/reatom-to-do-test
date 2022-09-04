import React from "react"
import cx from "classnames"

import { useAtom, useAction } from "@reatom/react-v1"
import { VISIBILITY_FILTERS, declareAction, declareAtom } from "./domain"

const filtersList = Object.keys(VISIBILITY_FILTERS)

export const setFilter = declareAction("setFilter")

export const VisibilityFilterAtom = declareAtom(
  "visibilityFilter", // name
  VISIBILITY_FILTERS.ALL, // initial state
  (on) => on(setFilter, (state, filter) => filter)
)

export function VisibilityFilters() {
  const visibilityFilter = useAtom(VisibilityFilterAtom)
  const handleClick = useAction((payload) => setFilter(payload))
  return (
    <div className="visibility-filters">
      {filtersList.map((filterKey) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey]
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              "filter",
              currentFilter === visibilityFilter && "filter--active"
            )}
            onClick={() => handleClick(currentFilter)}
          >
            {currentFilter}
          </span>
        )
      })}
    </div>
  )
}
