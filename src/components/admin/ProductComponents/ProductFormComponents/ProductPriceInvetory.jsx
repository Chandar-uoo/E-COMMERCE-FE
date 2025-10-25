import React from "react";

export const ProductPriceInventory = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
          Pricing & Inventory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min={0}
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange("price")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              placeholder="0"
              min={0}
              value={formData.stock}
              onChange={handleChange("stock")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min={0}
              placeholder="0.0"
              value={formData.weight}
              onChange={handleChange("weight")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};
