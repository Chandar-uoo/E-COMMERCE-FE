
// CartCard.jsx
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToCart, deleteFromCart } from "../../store/thunk/CartThunk";
import { Plus, Minus, Trash2 } from "lucide-react";
import Loader from "../Common/Loader";

const CartCard = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const items = cart.items || [];

  const handleIncrease = (productId) => {
    const cartItem = items.find((it) => it.product._id === productId);
    if (cartItem) {
      dispatch(updateToCart({ productId, quantity: cartItem.quantity + 1 }));
      setQuantity(cartItem.quantity + 1);
    }
  };

  const handleDecrease = (productId) => {
    const cartItem = items.find((it) => it.product._id === productId);
    if (cartItem && cartItem.quantity > 1) {
      dispatch(updateToCart({ productId, quantity: cartItem.quantity - 1 }));
      setQuantity(cartItem.quantity - 1);
    }
  };

  const handleDelete = (productId) => {
    dispatch(deleteFromCart(productId));
  };

  let sum = item.priceAtTheTime * item.quantity;
  sum = Number(sum.toFixed(2));

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Product Info */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-200"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {item.product.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {item.product.category || "Category"}
            </p>
            <p className="text-lg font-medium text-indigo-600 mt-2">
               ₹{item.priceAtTheTime}
            </p>
          </div>
        </div>

        {/* Desktop Layout - Delivery, Quantity, Total, Actions */}
        <div className="lg:col-span-6 flex flex-col lg:flex-row lg:items-center gap-18">
          {/* Delivery Charge */}
          <div className="lg:col-span-2 text-center">
            <span className="text-sm text-gray-500 lg:hidden">Delivery: </span>
            <span className="font-medium text-gray-900"> ₹15.00</span>
          </div>

          {/* Quantity Controls */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleDecrease(item.product._id)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <input
                value={quantity}
                readOnly
                className="w-16 text-center border-none focus:outline-none bg-transparent font-medium text-gray-900"
              />
              <button
                onClick={() => handleIncrease(item.product._id)}
                className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="lg:col-span-2 text-center">
            <span className="text-lg font-semibold text-gray-900">${sum}</span>
          </div>

          {/* Delete Button */}
          <div className="flex justify-center lg:justify-end">
            <button
              onClick={() => handleDelete(item.product._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
              title="Remove item"
            >
              <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;