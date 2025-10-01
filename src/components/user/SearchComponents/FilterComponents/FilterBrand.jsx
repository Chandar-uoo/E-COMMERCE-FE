import React from 'react'

export const FilterBrand = ({brand,handleFilterChange}) => {
  return (
   <><div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Brand</span>
            </label>
            <input
              type="text"
              placeholder="Enter brand name..."
              className="input input-bordered w-full"
              value={brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            />
          </div></>
  )
}
