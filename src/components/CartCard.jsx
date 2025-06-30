import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, updateToCart } from '../Store/Slices/CartThunk';

const CartCard = ({ item }) => {

  const [quantity, setquantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.value);
  const productdetails = product.find((product) => product._id == item.productId);
  // addQuantity
  const addQuantity = (id) => {
    setquantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      dispatch(updateToCart({ productId: id, quantity: newQuantity }));
      return newQuantity;
    });
  };
  // lessQuntity
  const lessQuntity = (id) => {
    setquantity((state) => {
      const newQuantity = state - 1;
      dispatch(updateToCart({ productId: id, quantity: newQuantity }));
      return newQuantity;
    });
  }
  return (
    <div className="card flex-row border-2 h-52 bg-base-100 w-fit shadow-sm mt-3 ml-32 mr-10 mb-3">
      <figure>
        <img
          src={productdetails.img}
          alt="Shoes" className='w-60 ml-2 rounded-2xl ' />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productdetails.ProductName}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div className="card-actions justify-end items-center space-x-4">
          <button onClick={() => dispatch(deleteFromCart(item.productId))} className="badge badge-outline cursor-pointer text-[15px] hover:bg-red-100 transition">Cancel</button>

          <div className="flex items-center space-x-2 border-2 rounded-2xl">
            <button
              className=" text-black rounded-4xl bg-gray-200 px-2 py-1  hover:bg-gray-300 transition"
              onClick={() => addQuantity(item.productId)}
            >
              +
            </button>

            <div className="badge badge-outline text-base">{quantity}</div>

            <button
              className="rounded-4xl text-black bg-gray-200 px-2 py-1  hover:bg-gray-300 transition"
              onClick={() => lessQuntity(item.productId)}
            >
              -
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartCard;
