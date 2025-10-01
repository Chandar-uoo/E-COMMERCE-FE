import React from 'react'

export const FilterSearch = ({search,handleFilterChange}) => {
  return (
    <>
    <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
    </>
  )
}
