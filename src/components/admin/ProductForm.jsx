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

const ProductForm = ({isUpdate,initialData}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading,error} = useSelector((state) => state.adminProductState);

  const [formData, setFormData] = useState({
    ProductName: initialData?.ProductName || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    img: initialData?.img || "",
    stock: initialData?.stock || "",
    rating: initialData?.rating || "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  dispatch(clearError()); // clear previous error first

   const parsedForm = {
    ...formData,
    price: parseFloat(formData.price),
    stock: parseInt(formData.stock),
    rating: parseFloat(formData.rating),
  };
  try {
    let actionResult;
    if (isUpdate) {
      actionResult = await dispatch(
        UpdateProduct({ id: initialData._id, updateFields: parsedForm })
      );
    } else {
      actionResult = await dispatch(AddProduct({  updateFields: parsedForm }));
    }

    // Only call onSuccess if action was successful
    if (actionResult.meta.requestStatus === "fulfilled") {
      await dispatch(FetchProduct());
      nav("/admin/products")
      setFormData({
        ProductName: "",
        category: "",
        description: "",
        price: "",
        img: "",
        stock: "",
        rating: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-black">
        {isUpdate ? "Update Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        placeholder="ProductName"
        value={formData.ProductName}
        onChange={(e) =>
          setFormData({ ...formData, ProductName: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="category"
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        placeholder="price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="img"
        value={formData.img}
        onChange={(e) =>
          setFormData({ ...formData, img: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        placeholder="stock"
        value={formData.stock}
        onChange={(e) =>
          setFormData({ ...formData, stock: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        placeholder="rating"
        value={formData.rating}
        onChange={(e) =>
          setFormData({ ...formData, rating: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : isUpdate ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
