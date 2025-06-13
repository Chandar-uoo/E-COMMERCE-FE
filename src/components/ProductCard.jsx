
import React from 'react'
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const nav = useNavigate();
  const veiwProduct = async (id) => {
    try {
      nav(`/product/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  }
  
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden p-4 hover:shadow-xl transition duration-300 w-full sm:w-60">
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl mb-3">
        <img onClick ={()=>veiwProduct(product._id)}
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
      <button className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard;