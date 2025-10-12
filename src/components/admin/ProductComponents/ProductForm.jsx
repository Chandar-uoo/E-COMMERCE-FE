import { useNavigate } from "react-router-dom";
import { ProductFormBasicInfo } from "./ProductFormComponents/ProductFormBasicInfo";
import { ProductDimension } from "./ProductFormComponents/ProductDimension";
import { ProductAdditionalInfo } from "./ProductFormComponents/ProductAdditionalInfo";
import { ProductPriceInventory } from "./ProductFormComponents/ProductPriceInvetory";

const ProductForm = ({ isUpdate, setFormData, formData, handleSubmit, addLoading,updateLoading }) => {
  const nav = useNavigate();

  const handleChange = (key) => (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (key === "images") {
      value = value.split(",").map((url) => url.trim()); // split by comma
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleNestedChange = (parentKey, childKey) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
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
            <ProductFormBasicInfo
              formData={formData}
              handleChange={handleChange}
            />
            //prop
            {/* Pricing & Inventory */}
            <ProductPriceInventory
              formData={formData}
              handleChange={handleChange}
            />
            //prp
            {/* Dimensions */}
            <ProductDimension
              formData={formData}
              handleNestedChange={handleNestedChange}
            />
            //prp
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
            <ProductAdditionalInfo
              formData={formData}
              handleChange={handleChange}
            />
            //prp
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
                disabled={addLoading||updateLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addLoading||updateLoading ? (
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
