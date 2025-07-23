import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProduct, FetchProduct, UpdateProduct } from "../../store/thunk/ProductThunk";


const ProductForm = ({ isUpdate = false, initialData = {}, onSuccess }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    ProductName: initialData.ProductName || "",
    category: initialData.category || "",
    description: initialData.description || "",
    price: initialData.price || "",
    img: initialData.img || "",
    stock: initialData.stock || "",
    rating: initialData.rating || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      await dispatch(UpdateProduct({ id: initialData._id, updateFields: formData }));
      await dispatch(FetchProduct());

    } else {
      await dispatch(AddProduct({ product: formData }));
      await dispatch(FetchProduct());

    }

    // Clear or close form
    if (onSuccess) onSuccess();
    setFormData({
      ProductName: "",
      category: "",
      description: "",
      price: "",
      img: "",
      stock: "",
      rating: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  text-black p-4 rounded-lg shadow-md max-w-md w-full space-y-3 border"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {isUpdate ? "Update Product" : "Add New Product"}
      </h2>

      {[
        "ProductName",
        "category",
        "description",
        "price",
        "img",
        "stock",
        "rating",
      ].map((field) => (
        <input
          key={field}
          type={
            ["price", "stock", "rating"].includes(field) ? "number" : "text"
          }
          placeholder={field}
          value={formData[field]}
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isUpdate ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
