import { toast } from "react-toastify";
import { useOrderCreationMutation } from "../../services/user/orderApi";
import { rzpay } from "../../utils/payment";

function usePaymentHooks() {
  const [orderCreation, { isLoading: isOrderLoading }] =
    useOrderCreationMutation();
  const process = async (itemsToOrder) => {
    try {
      const { razorPay } = await orderCreation({
        itemsFromClient: itemsToOrder,
      }).unwrap();
      await rzpay(razorPay);
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err };
    }
  };
  return {
    process,
    isOrderLoading,
  };
}
export default usePaymentHooks;
