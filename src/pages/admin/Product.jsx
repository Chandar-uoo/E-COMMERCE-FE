import React from 'react';
import { Plus } from 'lucide-react';
import ProductTable from '../../components/admin/ProductTable';
import { useNavigate } from 'react-router-dom';


const Products = () => {
const nav = useNavigate();

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <button
          onClick={() => nav("/admin/form")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>


      {/* Product List */}

        <ProductTable />
     
    </div>
  );
};

export default Products;
