import { Eye } from 'lucide-react'
import React from 'react'

export const ProductCard = ({product,viewProduct}) => {
  return (
    <>
    <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/300"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                         ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => viewProduct(product._id)}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none gap-1 px-4"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>
              </div>
    </>
  )
}
