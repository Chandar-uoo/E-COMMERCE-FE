import React,{useState} from 'react';
import { Plus } from 'lucide-react';
import ProductTable from '../../components/admin/ProductTable';
import ProductForm from '../../components/admin/ProductForm';


const Products = () => {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Toggle Form */}
      {showForm && <ProductForm onClose={() => setShowForm(false)} />}

      {/* Product List */}
      {!showForm && (
        <ProductTable />
      )}

     
    </div>
  );
};

export default Products;
