import React from 'react'

export const FilterStock = ({stock,handleFilterChange}) => {
  return (
    <><div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Stock Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={stock}
              onChange={(e) => handleFilterChange("stock", e.target.value)}
            >
              <option value="">All Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
          </div></>
  )
}
