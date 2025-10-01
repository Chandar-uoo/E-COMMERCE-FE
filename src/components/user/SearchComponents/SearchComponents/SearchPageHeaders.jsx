import { Filter, SearchIcon, SlidersHorizontal } from 'lucide-react'
import React from 'react'

export const SearchPageHeaders = ({pagination,sortBy,setSortBy,setSidebarOpen}) => {
  return (
   <>
   <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>

                <p className="text-sm text-gray-500">
                  {pagination.totalItems || 0} products found
                </p>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered text-black select-sm bg-white border-gray-200 focus:border-blue-500 min-w-[140px]"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_az">Name: A-Z</option>
                  <option value="name_za">Name: Z-A</option>
                </select>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="btn btn-outline btn-sm gap-2 border-blue-500 text-blue-600"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}
