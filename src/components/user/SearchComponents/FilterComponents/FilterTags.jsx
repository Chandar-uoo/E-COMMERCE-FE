import React from 'react'

export const FilterTags = ({tags,handleFilterChange}) => {
  return (
    <>
      <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Tags</span>
            </label>
            <input
              type="text"
              placeholder="Enter tags (comma separated)..."
              className="input input-bordered w-full"
              value={tags}
              onChange={(e) => handleFilterChange("tags", e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">
                Separate multiple tags with commas
              </span>
            </label>
          </div>

    </>
  )
}
