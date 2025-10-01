import { Search } from 'lucide-react'
import React from 'react'

export const FilterActions = ({applyFilters,resetFilters}) => {
  return (
    <>
    <div className="flex gap-2 pt-4">
            <button className="btn btn-primary flex-1" onClick={applyFilters}>
              <Search className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
            <button className="btn btn-outline" onClick={resetFilters}>
              Reset
            </button>
          </div>
    </>
  )
}
