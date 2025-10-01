import {
  useClearCartMutation,
  useReadCartQuery,
} from "../../services/user/cartApi";
import { useMemo } from "react";

function useMultiCartHooks() {
  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useReadCartQuery();

  const [clearCart] = useClearCartMutation();
  const items = cart?.items || [];

  const subtotal = useMemo(() => {
    if (items.length === 0) return 0;
    const sum = items.reduce(
      (total, item) => total + item.priceAtTheTime * item.quantity,
      0
    );
    return Number(sum.toFixed(2));
  }, [items]);

  const deliveryCharge = useMemo(() => {
    return items.length > 0 ? items.length * 15 : 0;
  }, [items]);

  const total = useMemo(() => {
    return Number((subtotal + deliveryCharge).toFixed(2));
  }, [subtotal, deliveryCharge]);

  return {
    isCartLoading,
    isCartError,
    clearCart,
    deliveryCharge,
    subtotal,
    cartError,
    items,
    total,
  };
}

export default useMultiCartHooks;
