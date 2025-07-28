
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/thunk/CartThunk';
import { useDispatch } from 'react-redux';
import { getProduct } from '../api/productService';
import ErrorMessage from './ErrorMessage';

const ProductCard = ({ product }) => {
  const [Error, setError] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const veiwProduct = async (id) => {
    try {
      const item = await getProduct(id);
      nav(`/products/${id}`,{state: { item }});
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }
  if(Error) return <ErrorMessage error={Error}/>
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden p-4 hover:shadow-xl transition duration-300 w-full sm:w-60">
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl mb-3">
        <img onClick={() => veiwProduct(product._id)}
          src={product.img}
          alt={product.ProductName}
          className="object-cover h-full w-full"
        />
      </div>
      <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
        {product.ProductName}
      </h3>
      <p className="text-sm text-gray-600 mb-1">₹{product.price}</p>
      <p className="text-sm text-yellow-500 mb-2">⭐ {product.rating}</p>
      <button onClick={() => dispatch(addToCart( product._id ))} className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard;