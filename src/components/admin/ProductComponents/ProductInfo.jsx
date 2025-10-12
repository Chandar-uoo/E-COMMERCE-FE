import React from 'react'

export const ProductInfo = () => {
  return (
<>
  <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title || product.ProductName}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full capitalize">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded-full capitalize">
                        {product.brand}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Rating */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">⭐</span>
                      <span className="text-gray-700 font-medium">{product.rating}</span>
                    </div>
                  )}
                </div>
              </div>
</>  )
}
