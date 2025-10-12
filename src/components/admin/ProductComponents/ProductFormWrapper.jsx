// ProductFormWrapper.jsx
import React from "react";
import  ProductForm  from "./ProductForm";
import { useLocation, useNavigate } from "react-router-dom";
import useAdminProductFormHooks from "../../../hooks/AdminProductHooks/AdminProductFormHooks";

const ProductFormWrapper = () => {
  const location = useLocation();
  const nav =  useNavigate()
  const { product:initialData } = location.state || {};
    const isUpdate = initialData ? true : false;
    
 const { handleSubmit, setFormData, formData, addLoading,updateLoading } = useAdminProductFormHooks({
  isUpdate,
  initialData
});


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      {initialData ? (
        <ProductForm isUpdate={isUpdate} handleSubmit={handleSubmit} addLoading={addLoading} updateLoading={updateLoading} setFormData={setFormData} formData={formData}/>
      ) : (
        <ProductForm isUpdate={isUpdate} handleSubmit={handleSubmit} addLoading={addLoading} updateLoading={updateLoading} setFormData={setFormData} formData={formData}  />
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
