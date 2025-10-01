import { useState } from "react";
import { useDeleteCartMutation, useUpdateCartMutation } from "../../services/user/cartApi";
import { toast } from "react-toastify";

function useSingleCartHooks(item) {
     const [updateCartItem, { isLoading: isupdateCartItemLoading }] =
    useUpdateCartMutation();
  const [deleteCartItem, { isLoading: isdeleteCartItemLoading }] =
    useDeleteCartMutation();
      const [quantity, setQuantity] = useState(item.quantity);
 
  const handleIncrease = async (productId) => {
    if (quantity > item.product.stock)
      return toast.warn("quantity cannot be higher than stock");
    try {
      await updateCartItem({ productId, quantity: item.quantity + 1 }).unwrap();
      setQuantity(quantity + 1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      await updateCartItem({ productId, quantity: item.quantity - 1 }).unwrap();
      setQuantity(item.quantity - 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteCartItem({ productId: productId }).unwrap();
    } catch (err) {
      toast.error(err.message);
    }
  };

  let sum = item.priceAtTheTime * item.quantity;
  sum = Number(sum.toFixed(2));
  return{
    handleDecrease,
    handleDelete,
    handleIncrease,
    quantity,
    setQuantity,
    sum,
    isdeleteCartItemLoading,
    isupdateCartItemLoading
  }
}
export default useSingleCartHooks;