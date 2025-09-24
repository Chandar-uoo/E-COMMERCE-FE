
import React, { useMemo, useEffect } from 'react';
import CartCard from '../../components/user/CartCard';
import EmptyState from '../../components/Common/EmptyState';
import { useDispatch, useSelector } from 'react-redux';
import { readCartService, clearCart } from '../../api/cartServices';
import { clearCartState } from '../../store/Slices/CartSlice';
import { orderMaking } from '../../store/thunk/OrderThunk';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Common/Loader';
import ErrorMessage from '../../components/Common/ErrorMessage';
import { readCart } from '../../store/thunk/CartThunk';

const Cart = () => {
  const { cart, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
          dispatch(readCart());
    };
    fetchCart();
  }, []);

  const items = cart?.items || [];

  const subtotal = useMemo(() => {
    if (items.length === 0) return 0;
    const sum = items.reduce((total, item) => total + item.priceAtTheTime * item.quantity, 0);
    return Number(sum.toFixed(2));
  }, [items]);

  const deliveryCharge = useMemo(() => {
    return items.length > 0 ? items.length * 15 : 0;
  }, [items]);

  const total = useMemo(() => {
    return Number((subtotal + deliveryCharge).toFixed(2));
  }, [subtotal, deliveryCharge]);

  const handleCheckOut = async () => {
    const data = await readCartService();
    const items = data.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    const orders = await dispatch(orderMaking({
      itemsFromClient: items,
      totalPrice: data.totalPrice
    }));

    if (orderMaking.fulfilled.match(orders)) {
      dispatch(clearCartState());
      await clearCart();
      nav("/product/payment");
    } else {
      console.error("Failed to create order");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

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
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
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
                    <span className="text-indigo-600">${total}</span>
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