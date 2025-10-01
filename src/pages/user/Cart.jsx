import EmptyState from "../../components/Common/EmptyState";
import Loader from "../../components/Common/Loader";
import { toast } from "react-toastify";
import usePaymentHooks from "../../hooks/paymentHook/usePaymentHook";
import useMultiCartHooks from "../../hooks/CartHooks/useMultiCartHooks";
import CartCard from "../../components/user/CartComponents/CartCard";

const Cart = () => {
  const {
    isCartLoading,
    isCartError,
    clearCart,
    deliveryCharge,
    subtotal,
    cartError,
    items,
    total,
  } = useMultiCartHooks();
  const { process, isOrderLoading } = usePaymentHooks();

  const handleCheckOut = async () => {
    const itemsToOrder = items?.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));
    const { success } = await process(itemsToOrder);

    if (success) {
      clearCart();
    }
  };

  if (isCartLoading || isOrderLoading) return <Loader />;
  // on read any error
  if (isCartError) {
    toast.error(cartError.message);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!items.length ? (
        <div className="flex items-center justify-center min-h-screen">
          <EmptyState message="Your cart is empty" />
        </div>
      ) : (
        <section className="py-12 relative">
          <div className="w-full max-w-6xl px-4 md:px-6 mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="col-span-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                Product
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-700 uppercase tracking-wide text-center">
                Delivery
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-700 uppercase tracking-wide text-center">
                Quantity
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-700 uppercase tracking-wide text-center">
                Total
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <CartCard key={item._id} item={item} />
              ))}
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-medium"> ₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="font-medium"> ₹{deliveryCharge}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300">
                Add Coupon Code
              </button>
              <button
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={handleCheckOut}
              >
                Continue to Payment →
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
