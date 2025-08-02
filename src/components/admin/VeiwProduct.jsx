import React from "react";
import { useLocation } from "react-router-dom";

const ViewProduct = () => {
 
    const location = useLocation();
  const {  product } = location.state || {};
   if (!product) return null;
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <div className="flex gap-4">
        <img
          src={product.img}
          alt={product.ProductName}
          className="w-32 h-32 object-cover rounded-lg border"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{product.ProductName}</h2>
          <p className="text-gray-500 text-sm capitalize">{product.category}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <p><strong>Price:</strong>$ {product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating}</p>
        <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewProduct;
