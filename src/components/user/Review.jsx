import React, { useState,useEffect } from "react";
import EmptyState from "../Common/EmptyState";
import { postReviewService } from "../../api/reviewService";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";



export const Review = ({ item, calculateAverageRating }) => {
  const [reviews, setReviews] = useState(item.reviews ?? []);
  const user = useSelector((state) => state.user.user);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const [writeReview, setwriteReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setloading] = useState(false);
  
   useEffect(() => {
    if (user && reviews.some((review) => review.user._id === user.id)) {
      setwriteReview(true);
    }
  }, [reviews, user]);
  const handleAddReview = async () => {
    if (newReview.comment.trim()) {
      setloading(true);
      const review = await postReviewService({
        id: item._id,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setReviews((prev) => [review.data, ...prev]);
      setwriteReview(true);
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
      setloading(false)
    }
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };
if(loading) return <Loader/>
  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          {!writeReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Write Review
            </button>
          )}
        </div>

        {/* Review Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {calculateAverageRating()}
            </div>
            <div className="flex justify-center text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(calculateAverageRating())
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = getRatingDistribution()[rating];
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Review Form */}
        {showReviewForm && (
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Write Your Review
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setNewReview((prev) => ({
                        ...prev,
                        rating: star,
                      }))
                    }
                    className="focus:outline-none"
                  >
                    <span
                      className={`text-3xl transition-colors duration-200 ${
                        star <= newReview.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                placeholder="Share your experience with this product..."
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddReview}
                disabled={!newReview.comment.trim()}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {review.user.name}
                      </h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
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
                        {review.createdAt.split("T")[0]}
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
      </div>
    </div>
  );
};
