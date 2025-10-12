import React from "react";
import { useLocation } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";

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
            <ProductDetails/>
            </div>
          </div>

          {/* Details Grid */}
        <ProductDetails/>//pr
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;