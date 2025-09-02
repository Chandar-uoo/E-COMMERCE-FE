import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProduct,
  FetchProduct,
  UpdateProduct,
} from "../../store/AdminThunk/ProductThunk";
import ErrorMessage from "../Common/ErrorMessage";
import { clearError } from "../../store/Slices/ProductSlice";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ isUpdate, initialData }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error } = useSelector((state) => state.adminProductState);

  const [formData, setFormData] = useState({
    ProductName: initialData?.title || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    brand: initialData?.brand || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    images: initialData?.images?.[0] || "",
    thumbnail: initialData?.thumbnail || "",
    weight: initialData?.weight || "",
    warrantyInformation: initialData?.warrantyInformation || "",
    shippingInformation: initialData?.shippingInformation || "",
    returnPolicy: initialData?.returnPolicy || "",
    availabilityStatus: initialData?.availabilityStatus || "",
    tags: initialData?.tags?.join(", ") || "",
    dimensions_width: initialData?.dimensions?.width || "",
    dimensions_height: initialData?.dimensions?.height || "",
    dimensions_depth: initialData?.dimensions?.depth || "",
    isDeleted: initialData?.isDeleted || false,
  });

  const handleChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const parsedForm = {
      title: formData.ProductName,
      category: formData.category,
      description: formData.description,
      brand: formData.brand,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images: [formData.images],
      thumbnail: formData.thumbnail,
      weight: parseFloat(formData.weight),
      warrantyInformation: formData.warrantyInformation,
      shippingInformation: formData.shippingInformation,
      returnPolicy: formData.returnPolicy,
      availabilityStatus: formData.availabilityStatus,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      dimensions: {
        width: parseFloat(formData.dimensions_width),
        height: parseFloat(formData.dimensions_height),
        depth: parseFloat(formData.dimensions_depth),
      },
      isDeleted: formData.isDeleted,
    };

    try {
      let actionResult;
      if (isUpdate) {
        actionResult = await dispatch(
          UpdateProduct({ id: initialData._id, updateFields: parsedForm })
        );
      } else {
        actionResult = await dispatch(AddProduct({ updateFields: parsedForm }));
      }

      if (actionResult.meta.requestStatus === "fulfilled") {
        await dispatch(FetchProduct({ fetch: "" }));
        nav("/admin/products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">
              {isUpdate ? "Update Product" : "Add New Product"}
            </h1>
            <p className="text-blue-100 mt-1">
              {isUpdate
                ? "Modify product information"
                : "Enter product details to add to inventory"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={formData.ProductName}
                    onChange={handleChange("ProductName")}
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={handleChange("category")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="">All Categories</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                    <option value="groceries">Groceries</option>
                    <option value="home-decoration">Home Decoration</option>
                    <option value="kitchen-accessories">
                      Kitchen Accessories
                    </option>
                    <option value="laptops">Laptops</option>
                    <option value="mens-shirts">Men's Shirts</option>
                    <option value="mens-shoes">Men's Shoes</option>
                    <option value="mens-watches">Men's Watches</option>
                    <option value="mobile-accessories">
                      Mobile Accessories
                    </option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="skin-care">Skin Care</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="sports-accessories">
                      Sports Accessories
                    </option>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    value={formData.brand}
                    onChange={handleChange("brand")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status
                  </label>
                  <select
                    value={formData.availabilityStatus}
                    onChange={handleChange("availabilityStatus")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter detailed product description..."
                  value={formData.description}
                  onChange={handleChange("description")}
                  rows={4}
                  className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange("price")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange("stock")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={handleChange("weight")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                Dimensions (cm)
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.dimensions_width}
                    onChange={handleChange("dimensions_width")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.dimensions_height}
                    onChange={handleChange("dimensions_height")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Depth
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.dimensions_depth}
                    onChange={handleChange("dimensions_depth")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Product Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.images}
                    onChange={handleChange("images")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={formData.thumbnail}
                    onChange={handleChange("thumbnail")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                Additional Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="electronics, gadgets, tech (comma separated)"
                    value={formData.tags}
                    onChange={handleChange("tags")}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Warranty Information
                  </label>
                  <textarea
                    placeholder="1 year manufacturer warranty"
                    value={formData.warrantyInformation}
                    onChange={handleChange("warrantyInformation")}
                    rows={2}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Information
                  </label>
                  <textarea
                    placeholder="Free shipping on orders over $50"
                    value={formData.shippingInformation}
                    onChange={handleChange("shippingInformation")}
                    rows={2}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Policy
                  </label>
                  <textarea
                    placeholder="30-day return policy"
                    value={formData.returnPolicy}
                    onChange={handleChange("returnPolicy")}
                    rows={2}
                    className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDeleted}
                    onChange={handleChange("isDeleted")}
                    className="w-5 h-5 text-red-600 bg-white border-2 border-red-300 rounded focus:ring-red-500 focus:ring-2 mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-medium text-red-900">
                      Mark as Deleted
                    </span>
                    <p className="text-xs text-red-700 mt-1">
                      Product will be hidden from customers but kept in system
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-6">
                <ErrorMessage message={error} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t  text-black border-gray-200">
              <button
                type="button"
                onClick={() => nav("/admin/products")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : isUpdate ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
