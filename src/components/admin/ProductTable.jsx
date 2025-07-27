
import React, { useEffect,useState } from 'react';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { DeleteProduct, FetchProduct } from '../../store/thunk/ProductThunk';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Common/Loader';
import ProductForm from './ProductForm'; // 🆕
const ProductTable = () => {
  const dispatch = useDispatch();
  const { products = [],loading, error } = useSelector((state) => state.products);

  const [editProduct, setEditProduct] = useState(null); // 🆕

  const fetchAllProducts = () => {
    dispatch(FetchProduct());
  };

  const deleteProduct = async (id) => {
    dispatch(DeleteProduct(id)).then(() => fetchAllProducts());
  };

  const handleEditClick = (product) => {
    setEditProduct(product); // 🆕
  };

  const handleFormClose = () => {
    setEditProduct(null); // 🆕
  };

  useEffect(() => {
    fetchAllProducts();
  }, [dispatch]);

  if (loading && products.length === 0) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {!editProduct && (
        <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      )}


      {editProduct && (
        <div className="p-4">
          <ProductForm
            isUpdate={true}
            initialData={editProduct}
            onSuccess={() => {
              handleFormClose();
              fetchAllProducts(); // refresh list
            }}
          />
        </div>
      )}

      {!editProduct && (<div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.ProductName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  )}
    </div>
  );
};

export default ProductTable;
