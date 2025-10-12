import React from "react";
import { useLocation } from "react-router-dom";

export const ProductDetails = () => {
  const location = useLocation();
const product = location.state?.product || {};

  
  return (
    <>
      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Product Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stock & Availability */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">
              Availability
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className="font-medium text-gray-900">
                  {product.stock}
                </span>
              </div>
              {product.availabilityStatus && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">
                    {product.availabilityStatus}
                  </span>
                </div>
              )}
              {product.soldCount !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Sold:</span>
                  <span className="font-medium text-gray-900">
                    {product.soldCount}
                  </span>
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
                    <span className="font-medium text-gray-900">
                      {product.weight} lbs
                    </span>
                  </div>
                )}
                {product.dimensions && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Width:</span>
                      <span className="font-medium text-gray-900">
                        {product.dimensions.width}"
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height:</span>
                      <span className="font-medium text-gray-900">
                        {product.dimensions.height}"
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depth:</span>
                      <span className="font-medium text-gray-900">
                        {product.dimensions.depth}"
                      </span>
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
                  <span className="font-medium text-gray-900">
                    {product.warrantyInformation}
                  </span>
                </div>
              )}
              {product.returnPolicy && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Returns:</span>
                  <span className="font-medium text-gray-900">
                    {product.returnPolicy}
                  </span>
                </div>
              )}
              {product.shippingInformation && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-gray-900">
                    {product.shippingInformation}
                  </span>
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
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
            {product.updatedAt && product.updatedAt !== product.createdAt && (
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {new Date(product.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
