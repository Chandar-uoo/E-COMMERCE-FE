import React from 'react'

export const ReveiwsDisplay = ({reviews}) => {
  
  return (
    <>
    <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {review.user?.name}
                      </h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                         {review.createdAt?.split("T")[0] ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <EmptyState
              message={"No reviews yet. Be the first to review this product!"}
            />
          )}
        </div>
    </>
  )
}
