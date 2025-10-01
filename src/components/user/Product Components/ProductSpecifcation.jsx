import React from 'react'

export const ProductSpecifcation = ({item}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Product Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-800 capitalize">
                          {item.category}
                        </span>
                      </div>
                      {item.brand && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium text-gray-800">
                            {item.brand}
                          </span>
                        </div>
                      )}
                      {item.weight && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium text-gray-800">
                            {item.weight}g
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.dimensions && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Dimensions
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Width:</span>
                          <span className="font-medium text-gray-800">
                            {item.dimensions.width} cm
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Height:</span>
                          <span className="font-medium text-gray-800">
                            {item.dimensions.height} cm
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 ">Depth:</span>
                          <span className="font-medium text-gray-800">
                            {item.dimensions.depth} cm
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Policies
                    </h3>
                    <div className="space-y-2 text-gray-800">
                      {item.warrantyInformation && (
                        <div>
                          <span className="text-gray-600 block">Warranty:</span>
                          <span className="font-medium text-gray-800 text-sm">
                            {item.warrantyInformation}
                          </span>
                        </div>
                      )}
                      {item.shippingInformation && (
                        <div>
                          <span className="text-gray-600 block">Shipping:</span>
                          <span className="font-medium text-gray-800 text-sm">
                            {item.shippingInformation}
                          </span>
                        </div>
                      )}
                      {item.returnPolicy && (
                        <div>
                          <span className="text-gray-600 block">Returns:</span>
                          <span className="font-medium  text-gray-800 text-sm">
                            {item.returnPolicy}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
  )
}
