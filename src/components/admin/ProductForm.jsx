
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
  });

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
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
        await dispatch(FetchProduct());
        nav("/admin/products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-black">
        {isUpdate ? "Update Product" : "Add New Product"}
      </h2>

      <input type="text" placeholder="Product Name" value={formData.ProductName} onChange={handleChange("ProductName")} className="input" />
      <input type="text" placeholder="Category" value={formData.category} onChange={handleChange("category")} className="input" />
      <input type="text" placeholder="Description" value={formData.description} onChange={handleChange("description")} className="input" />
      <input type="text" placeholder="Brand" value={formData.brand} onChange={handleChange("brand")} className="input" />
      <input type="number" placeholder="Price" value={formData.price} onChange={handleChange("price")} className="input" />
      <input type="number" placeholder="Stock" value={formData.stock} onChange={handleChange("stock")} className="input" />
      <input type="text" placeholder="Image URL" value={formData.images} onChange={handleChange("images")} className="input" />
      <input type="text" placeholder="Thumbnail URL" value={formData.thumbnail} onChange={handleChange("thumbnail")} className="input" />
      <input type="number" placeholder="Weight" value={formData.weight} onChange={handleChange("weight")} className="input" />
      <input type="text" placeholder="Warranty Information" value={formData.warrantyInformation} onChange={handleChange("warrantyInformation")} className="input" />
      <input type="text" placeholder="Shipping Information" value={formData.shippingInformation} onChange={handleChange("shippingInformation")} className="input" />
      <input type="text" placeholder="Return Policy" value={formData.returnPolicy} onChange={handleChange("returnPolicy")} className="input" />
      <input type="text" placeholder="Availability Status" value={formData.availabilityStatus} onChange={handleChange("availabilityStatus")} className="input" />
      <input type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange("tags")} className="input" />

      <div className="grid grid-cols-3 gap-2">
        <input type="number" placeholder="Width" value={formData.dimensions_width} onChange={handleChange("dimensions_width")} className="input" />
        <input type="number" placeholder="Height" value={formData.dimensions_height} onChange={handleChange("dimensions_height")} className="input" />
        <input type="number" placeholder="Depth" value={formData.dimensions_depth} onChange={handleChange("dimensions_depth")} className="input" />
      </div>

      {error && <ErrorMessage message={error} />}

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {loading ? "Saving..." : isUpdate ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
