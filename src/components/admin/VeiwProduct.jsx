import React from "react";
import { useLocation } from "react-router-dom";

const ViewProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};
  
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={product.thumbnail || product.img || (product.images && product.images[0])}
                  alt={product.title || product.ProductName}
                  className="w-80 h-80 object-cover rounded-xl border border-gray-200 shadow-sm"
                />
                {/* Additional Images */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {product.images.slice(1, 4).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.title || product.ProductName} ${index + 2}`}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
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
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stock & Availability */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Availability
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium text-gray-900">{product.stock}</span>
                  </div>
                  {product.availabilityStatus && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-green-600">{product.availabilityStatus}</span>
                    </div>
                  )}
                  {product.soldCount !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sold:</span>
                      <span className="font-medium text-gray-900">{product.soldCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dimensions & Weight */}
              {(product.dimensions || product.weight) && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                    Specifications
                  </h3>
                  <div className="space-y-2 text-sm">
                    {product.weight && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium text-gray-900">{product.weight} lbs</span>
                      </div>
                    )}
                    {product.dimensions && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Width:</span>
                          <span className="font-medium text-gray-900">{product.dimensions.width}"</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Height:</span>
                          <span className="font-medium text-gray-900">{product.dimensions.height}"</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depth:</span>
                          <span className="font-medium text-gray-900">{product.dimensions.depth}"</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Policies */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Policies
                </h3>
                <div className="space-y-2 text-sm">
                  {product.warrantyInformation && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-medium text-gray-900">{product.warrantyInformation}</span>
                    </div>
                  )}
                  {product.returnPolicy && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Returns:</span>
                      <span className="font-medium text-gray-900">{product.returnPolicy}</span>
                    </div>
                  )}
                  {product.shippingInformation && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium text-gray-900">{product.shippingInformation}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                {product.createdAt && (
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(product.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
                {product.updatedAt && product.updatedAt !== product.createdAt && (
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(product.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;