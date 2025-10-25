import { useState } from "react";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../services/admin/adminProductApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useAdminProductFormHooks({ isUpdate, initialData }) {
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    brand: initialData?.brand || "",
    price: initialData?.price?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    images: initialData?.images || [""],
    thumbnail: initialData?.thumbnail || "",
    weight: initialData?.weight?.toString() || "",
    warrantyInformation: initialData?.warrantyInformation || "",
    shippingInformation: initialData?.shippingInformation || "",
    returnPolicy: initialData?.returnPolicy || "",
    availabilityStatus: initialData?.availabilityStatus || "",
    tags: initialData?.tags?.join(", ") || "",
    dimensions: {
      width: initialData?.dimensions?.width?.toString() || "",
      height: initialData?.dimensions?.height?.toString() || "",
      depth: initialData?.dimensions?.depth?.toString() || "",
    },
    isDeleted: initialData?.isDeleted || false,
  });
  const nav = useNavigate();

  const [addProduct,{isLoading:addLoading}] = useAddProductMutation();
  const [updateProduct,{isLoading:updateLoading}] = useUpdateProductMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      weight: parseFloat(formData.weight),
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      dimensions: {
        width: parseFloat(formData.dimensions.width),
        height: parseFloat(formData.dimensions.height),
        depth: parseFloat(formData.dimensions.depth),
      },
    };
    try {
        if(import.meta.env.VITE_ADMIN_ACCESS==="DEMO") {
           nav("/admin/products");
           return toast.success("DEMO MODE : certain actions are restrcted")
        }
      if (isUpdate) {
        await updateProduct({
          id: initialData._id,
          updateFields: payload,
        }).unwrap();
      } else {
        await addProduct({ updateFields: payload }).unwrap();
      }
      toast.success("product details updated")

      nav("/admin/products");
    } catch (err) {
      toast.error(err?.message);
      console.error(err);
    }
  };

  return {
    handleSubmit,
    addLoading,
    updateLoading,
    setFormData,
    formData
  }
}
export default useAdminProductFormHooks;
