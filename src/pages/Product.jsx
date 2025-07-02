import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToCart } from '../store/thunk/CartThunk';
import { orderMaking } from '../store/thunk/OrderThunk';


const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const AllProduct = useSelector((state) => state.product.value);
  const product = AllProduct.find((item) => item._id === id);
  const nav = useNavigate();
  const process = async () => {
    const resultAction = await dispatch(orderMaking({ _id: id }));
  
    if (orderMaking.fulfilled.match(resultAction)) {
  
      nav(`/product/payment/${id}`);
    } else {
      
      console.error("Order creation failed:", resultAction.payload || resultAction.error);
    }
  };
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <main className="p-12">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-12">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight text-center mb-4">
              {product.ProductName}
            </h1>
            <p className="text-lg text-gray-500 text-center">
              Explore the best of {product.category}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <img
              src={product.img}
              alt={product.ProductName}
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Category</h2>
              <p className="text-xl font-medium text-gray-800">{product.category}</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Price</h2>
              <p className="text-3xl font-bold text-green-600">₹{product.price}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Description</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Ratings</h2>
            <p className="text-lg text-yellow-500 font-semibold">⭐ {product.rating} / 5</p>
          </div>

          <div className="text-center">
            <button onClick={()=>dispatch(addToCart({productId:product._id}))} className="px-12 py-4 bg-indigo-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-indigo-600 transition">
              Add to Cart
            </button>
            <button  onClick={process} className="px-12 py-4 bg-green-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-green-600 transition ml-4">
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;