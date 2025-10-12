import React from "react";

export const ProductAdditionalInfo = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
          Additional Information
        </h2>

        <div className="space-y-6">
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              placeholder="electronics, gadgets, tech (comma separated)"
              value={formData.tags}
              onChange={handleChange("tags")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Warranty Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warranty Information
            </label>
            <textarea
              placeholder="1 year manufacturer warranty"
              value={formData.warrantyInformation}
              onChange={handleChange("warrantyInformation")}
              rows={2}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Shipping Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Information
            </label>
            <textarea
              placeholder="Free shipping on orders over $50"
              value={formData.shippingInformation}
              onChange={handleChange("shippingInformation")}
              rows={2}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Return Policy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Policy
            </label>
            <textarea
              placeholder="30-day return policy"
              value={formData.returnPolicy}
              onChange={handleChange("returnPolicy")}
              rows={2}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};
