import React from 'react'

export const FilterSort = ({sortBy,handleFilterChange}) => {
  return (
    <> <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Sort By</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="sold">Most Sold</option>
            </select>
          </div></>
  )
}
