import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../../services/admin/adminProductApi";
import { useNavigate } from "react-router-dom";

function useAdminSingleProduct() {
  const nav = useNavigate();
  const [deleteItem] = useDeleteProductMutation();

  const handleDeleteProduct = async (id) => {
    try {
      await deleteItem(id).unwrap();
      toast.success("product marked as deleted ")
    } catch (error) {
      toast.error(error.message || "something weent wrong");
    }
  };

  const handleEditClick = (product) => {
    nav("/admin/product-form", { state: { product } });
  };
  const veiwProduct = async (product) => {
    nav(`/admin/veiwProduct/${product._id}`, { state: { product } });
  };
  return {
    handleDeleteProduct,
    handleEditClick,
    veiwProduct,
  };
}
export default useAdminSingleProduct;
