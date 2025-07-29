import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';


const Search = () => {
    const location = useLocation();
    const {products = []} = location.state|| {};
    const nav =  useNavigate();
     const veiwProduct = async (id,item) => {
        try {
          nav(`/products/${id}`,{state: { item }});
        } catch (err) {
          console.log(err.message);
        }
      }
  return (
    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Product List</h2>

    {products.length === 0 ? (
      <EmptyState message={"No products found"}/>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.img || "https://via.placeholder.com/150"}
              alt={product.ProductName}
              className="w-full  h-40 object-cover rounded-xl mb-3"
            />
            <h3 className="text-xl text-black font-bold">{product.ProductName}</h3>
            <p className="text-gray-600 capitalize">{product.category}</p>
            <p className="text-green-600 font-semibold mt-1">₹{product.price}</p>
            <button onClick={()=>veiwProduct(product._id,product)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
              View 
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Search;
