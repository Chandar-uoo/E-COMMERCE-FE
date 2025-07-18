import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/thunk/CartThunk';
import { orderMaking } from '../store/thunk/OrderThunk';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';


const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const { item } = location.state || {};
  const dispatch = useDispatch();
  const nav = useNavigate();
  const errorResult =  useSelector((state)=>state.order.error);
  const process = async () => {
  const resultAction = await dispatch(orderMaking({ itemsFromClient: [{ productId: id, quantity: 1 }] }));
  
  
        if (orderMaking.fulfilled.match(resultAction)) {
      nav("/product/payment");
    } else {
      console.error("Order creation failed:", resultAction.payload || resultAction.error);
      return <ErrorMessage error={errorResult}/>
    }
  };
  
  if (!item) {
    return (
      <EmptyState message={" Product not found."} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <main className="p-12">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-12">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight text-center mb-4">
              {item.ProductName}
            </h1>
            <p className="text-lg text-gray-500 text-center">
              Explore the best of {item.category}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <img
              src={item.img}
              alt={item.ProductName}
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Category</h2>
              <p className="text-xl font-medium text-gray-800">{item.category}</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Price</h2>
              <p className="text-3xl font-bold text-green-600">₹{item.price}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Description</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Ratings</h2>
            <p className="text-lg text-yellow-500 font-semibold">⭐ {item.rating} / 5</p>
          </div>

          <div className="text-center">
            <button onClick={() => dispatch(addToCart({ productId: item._id }))} className="px-12 py-4 bg-indigo-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-indigo-600 transition">
              Add to Cart
            </button>
            <button onClick={process} className="px-12 py-4 bg-green-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-green-600 transition ml-4">
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;