import React from 'react'

export const ProductDetails = ({item,calculateAverageRating,decrementQuantity,quantity,incrementQuantity,handleAddToCart,isCartLoading,isOrderLoading,orderProduct}) => {
  return (
   <>
    <div className="space-y-6">
                {/* Header */}
                <div>
                  {item.brand && (
                    <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-2">
                      {item.brand}
                    </p>
                  )}
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h1>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
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
                    <span className="text-gray-600">
                      ({calculateAverageRating()}/5)
                    </span>
                    {item.availabilityStatus && (
                      <span
                        className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                          item.availabilityStatus === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.availabilityStatus}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="border-t border-b border-gray-200 py-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-green-600">
                      ₹{item.price}
                    </span>
                    <span className="text-gray-500">per unit</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[50px] text-gray-800 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= item.stock}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.stock} items available
                    </span>
                  </div>

                  <div className="text-lg font-semibold text-gray-900">
                    Total: ₹{(item.price * quantity).toFixed(2)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isCartLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isCartLoading ? "Adding to Cart..." : "Add to Cart"}
                  </button>

                  <button
                    onClick={()=>orderProduct(item._id)}
                    disabled={isOrderLoading || item.stock < quantity}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isOrderLoading ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
   </>
  )
}
