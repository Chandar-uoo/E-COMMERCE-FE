// ProductFormWrapper.jsx
import React from "react";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import { useLocation, useNavigate } from "react-router-dom";

const ProductFormWrapper = () => {
  const location = useLocation();
  const nav =  useNavigate()
  const { error } = useSelector((state) => state.products);
  const { product } = location.state || {};
  
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      {product ? (
        <ProductForm isUpdate={true} error={error} initialData = {product} />
      ) : (
        <ProductForm isUpdate={false} error={error} />
      )}

        <button
        onClick={()=>nav("/admin/products")}
        type="submit"
        className="w-full mt-1 bg-red-600 text-white py-2 rounded hover:bg-red-900 transition"
      >
       cancel
      </button>
    </div>
  );
};

export default ProductFormWrapper;
