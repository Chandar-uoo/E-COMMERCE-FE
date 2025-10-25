import React from "react";

export const ProductDimension = ({ formData,handleNestedChange }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
          Dimensions (cm)
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <input
              type="number"
              step="0.1"
              min={0}
              placeholder="0.0"
              value={formData.dimensions.width}
              onChange={ handleNestedChange("dimensions", "width")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <input
              type="number"
              step="0.1"
              min={0}
              placeholder="0.0"
              value={formData.dimensions.height}
              onChange={ handleNestedChange("dimensions", "height")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Depth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depth
            </label>
            <input
              type="number"
              step="0.1"
              min={0}
              placeholder="0.0"
              value={formData.dimensions.depth}
              onChange={ handleNestedChange("dimensions", "depth")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};
