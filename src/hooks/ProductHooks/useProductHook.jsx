import { useState } from "react";
import { toast } from "react-toastify";
import { useAddCartMutation } from "../../services/user/cartApi";

function useProductHook({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [addCart, { isLoading: isCartLoading }] = useAddCartMutation();

  const calculateAverageRating = () => {
    if (item.reviews.length === 0) return item.rating || 4.5;
    const sum = item.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / item.reviews.length).toFixed(1);
  };

  const incrementQuantity = () => {
    if (quantity < (item.stock || 99)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
   const handleAddToCart = async () => {
    try {
      await addCart({ productId: item._id || item.id, quantity }).unwrap();
      toast.success("Item added to cart");
    } catch (err) {
      console.log(err);
      toast.warn(err.message);
    }
  };
  return {
    handleAddToCart,
    incrementQuantity,
    decrementQuantity,
    calculateAverageRating,
    isCartLoading,
    quantity,
  };
}
export default useProductHook;
