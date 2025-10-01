import { MoveLeft, MoveRight } from 'lucide-react'
import React from 'react'

export const PaginationAction = ({pagination,prev,next}) => {
  return (
   <>
   <div className="flex justify-center-safe gap-4  px-4">
        {pagination.hasPrevPage && (
          <button
            onClick={prev}
            className="join-item  btn btn-outline bg-black w"
          >
            <MoveLeft />
            Prev
          </button>
        )}
        {pagination.hasNextPage && (
          <button
            onClick={next}
            className="join-item btn btn-outline bg-black "
          >
            Next
            <MoveRight />
          </button>
        )}
      </div>
   </>
  )
}
