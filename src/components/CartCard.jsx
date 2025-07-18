import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToCart,deleteFromCart } from "../store/thunk/CartThunk";
import { Plus, Minus } from "lucide-react";
import { Trash2 } from "lucide-react";

const CartCard = ({ item }) => {
const [quantity, setQuantity] = useState(item.quantity);
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.cart);
// Handle quantity increase
  const handleIncrease = (productId) => {
    const item = cartItems.find((item) => item.productId._id === productId);
    if (item) {
      // Dispatch the updateToCart action with the new quantity
      dispatch(updateToCart({ productId, quantity: item.quantity + 1 }));
      setQuantity(item.quantity + 1);
    }
  };
  // Handle quantity decrease
  const handleDecrease = (productId) => {
    const item = cartItems.find((item) => item.productId._id === productId);
    // Ensure quantity does not go below 1
    if (item && item.quantity > 1) {
      // Dispatch the updateToCart action with the new quantity
      dispatch(updateToCart({ productId, quantity: item.quantity - 1 }));
      setQuantity(item.quantity - 1);
    }
  };
  const handleDelete = (productId) => {
    // Dispatch the deleteFromCart action
    dispatch(deleteFromCart(productId));  
  }
  let sum = item.productId.price * item.quantity;
  sum = Number(sum.toFixed(2));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
          <img
            src={item.productId.img}
            alt={item.productId.ProductName}
            className="xl:w-[140px] rounded-xl object-cover"
          />
        </div>
        <div className="pro-data w-full max-w-sm">
          <h5 className="font-semibold text-xl leading-8 text-white max-[550px]:text-center">
            {item.productId.ProductName}
          </h5>
          <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
            {item.productId.category || "Category"}
          </p>
          <h6 className="font-medium  text-lg leading-8 text-indigo-600 max-[550px]:text-center">
            ₹{item.productId.price}
          </h6>
        </div>
      </div>
      <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        <h6 className="font-manrope font-bold text-2xl leading-9 text-white w-full max-w-[176px] text-center">
          $15.00 <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery Charge)</span>
        </h6>
        <div className="flex items-center w-full mx-auto justify-center">
          <button
            className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            onClick={() => handleDecrease(item.productId._id)}
          >
            <Minus size={20} className="text-white transition-all duration-500 group-hover:stroke-black " />
            
          </button>
          <input
            type="text"
            className="border-y border-gray-200 outline-none text-white-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
            value={quantity}
            readOnly
          />
          <button
            className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            onClick={() => handleIncrease(item.productId._id)}
          >
            <Plus size={20} className="text-white transition-all duration-500 group-hover:stroke-black" /> 
          </button>
        </div>
        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          ${sum}
        </h6>
        {/* Delete Button */}
        <button
          onClick={() => handleDelete(item.productId._id)}
          className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
          title="Remove from Cart"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartCard;



