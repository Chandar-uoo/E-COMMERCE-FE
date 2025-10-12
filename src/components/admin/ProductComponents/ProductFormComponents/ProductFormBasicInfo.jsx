import React from "react";

export const ProductFormBasicInfo = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={formData.title}
              onChange={handleChange("title")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={handleChange("category")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Select Category</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
              <option value="kitchen-accessories">Kitchen Accessories</option>
              <option value="laptops">Laptops</option>
              <option value="mens-shirts">Men's Shirts</option>
              <option value="mens-shoes">Men's Shoes</option>
              <option value="mens-watches">Men's Watches</option>
              <option value="mobile-accessories">Mobile Accessories</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="skin-care">Skin Care</option>
              <option value="smartphones">Smartphones</option>
              <option value="sports-accessories">Sports Accessories</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="tablets">Tablets</option>
              <option value="tops">Tops</option>
              <option value="vehicle">Vehicle</option>
              <option value="womens-bags">Women's Bags</option>
              <option value="womens-dresses">Women's Dresses</option>
              <option value="womens-jewellery">Women's Jewellery</option>
              <option value="womens-shoes">Women's Shoes</option>
              <option value="womens-watches">Women's Watches</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <input
              value={formData.brand}
              onChange={handleChange("brand")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability Status
            </label>
            <select
              value={formData.availabilityStatus}
              onChange={handleChange("availabilityStatus")}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Select Status</option>
              <option value="In Stock">✅ In Stock</option>
              <option value="Low Stock">⚠️ Low Stock</option>
              <option value="Out of Stock">❌ Out of Stock</option>
              <option value="Discontinued">🚫 Discontinued</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter detailed product description..."
            value={formData.description}
            onChange={handleChange("description")}
            rows={4}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            required
          />
        </div>
      </div>
    </>
  );
};
