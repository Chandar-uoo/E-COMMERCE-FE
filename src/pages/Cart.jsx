import React, { useMemo,useEffect} from 'react'
import CartCard from '../components/CartCard';
import EmptyState from '../components/EmptyState';
import { useDispatch, useSelector } from 'react-redux';
import { readCartService,clearCart} from '../api/cartServices';
import { addCartItem, clearCartState } from '../store/Slices/CartSlice';
import { orderMaking } from '../store/thunk/OrderThunk';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();
  // Fetch cart items from the Redux store
  useEffect(() => {
    const fetchCart = async () => {
      try { 
        const cartData = await readCartService();
        if (cartData) {
          dispatch(addCartItem(cartData));
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchCart();
  }, []);

  

  // Calculate subtotal if only cartItems not empty
    const subtotal = useMemo(() => {
      if(cartItems.length === 0) return 0;
      const sum = cartItems.reduce((total, item) => total + item?.productId?.price * item?.quantity, 0);
      return Number(sum.toFixed(2)); 
    }, [cartItems]);
  
  // Delivery charge (example: ₹15 per item)
    const deliveryCharge = useMemo(() => {

      return cartItems.length > 0 ? cartItems.length * 15 :0;
    }, [cartItems]);

  // Total price
  const total = useMemo(()=>{
    return Number((subtotal+deliveryCharge).toFixed(2))
  },[subtotal,deliveryCharge]);
  
  
  const handleCheckOut = async () => {
    // Implement checkout logic here  
    const data = await readCartService();
    const total = data.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0).toFixed(2);
  
    const items = data.map((item)=>({
      productId:item.productId._id,
      quantity:item.quantity,
    }));
    const orders = await dispatch(orderMaking({itemsFromClient:items,totalPrice:total}));
    if (orderMaking.fulfilled.match(orders)) {
      // Clear cart after successful order creation
   // ✅ Replace direct call to clearCart()
dispatch(clearCartState()); // Redux state
await clearCart(); // Backend clear

      //nav to transaction
      nav("/product/payment")
    }
    else {
      console.error("Failed to create order");
    }
  };
  return (
   cartItems.length === 0 ? (  
    <EmptyState message="Your cart is empty" />
   ) : (
   <section className="py-24 relative">
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-centertext-white">
        Shopping Cart
      </h2>
      <div className="hidden lg:grid grid-cols-2 py-6">
        <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
        <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
          <span className="w-full max-w-[200px] text-center">Delivery Charge</span>
          <span className="w-full max-w-[260px] text-center">Quantity</span>
          <span className="w-full max-w-[200px] text-center">Total</span>
        </p>
      </div>

      {/* Render Cart Items */}
      {cartItems.map((item) => (
        <CartCard
          key={item.productId._id}
          item={item}
        />
      ))}

      {/* Summary Section */}
      <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
        <div className="flex items-center justify-between w-full mb-6">
          <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
          <h6 className="font-semibold text-xl leading-8 text-gray-900">${subtotal}</h6>
        </div>
        <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
          <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
          <h6 className="font-semibold text-xl leading-8 text-gray-900">${deliveryCharge}</h6>
        </div>
        <div className="flex items-center justify-between w-full py-6">
          <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
          <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">₹{total}</h6>
        </div>
      </div>

      {/* Checkout Buttons */}
      <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
        <button className="rounded-full py-4 w-full max-w-[280px] flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
          <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Add Coupon Code</span>
        </button>
        <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700" onClick={handleCheckOut}>
          Continue to Payment
        </button>
      </div>
    </div>
  </section>
  )
  );
};

export default Cart;