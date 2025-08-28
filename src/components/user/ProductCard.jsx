
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/thunk/CartThunk';
import { useDispatch } from 'react-redux';

import { FetchProductById } from '../../store/thunk/ProductThunk';

const ProductCard = ({ product }) => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const veiwProduct = async (id) => {
  const result = dispatch(FetchProductById(id));
  if (!result.error) {
    nav(`/products/${id}`);
  }
};


  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden p-4 hover:shadow-xl transition duration-300 w-full sm:w-60">
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl mb-3">
        <img onClick={() => veiwProduct(product._id)}
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-full w-full"
        />
      </div>
      <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
        {product.title}
      </h3>
      <p className="text-sm text-gray-600 mb-1">${product.price}</p>
      <button onClick={() => dispatch(addToCart({ productId:product._id ,quantity:1}))} className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard;