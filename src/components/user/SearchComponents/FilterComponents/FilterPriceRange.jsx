import React from 'react'

export const FilterPriceRange = ({minPrice,maxPrice,handleFilterChange}) => {
  return (
    <><div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Price Range</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                className="input input-bordered w-full"
                value={minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="input input-bordered w-full"
                value={maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div></>
  )
}
