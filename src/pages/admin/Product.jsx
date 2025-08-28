import React from "react";
import { MoveRight,MoveLeft, Plus } from "lucide-react";
import ProductTable from "../../components/admin/ProductTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "../../hooks/usePagination";
import { FetchProduct } from "../../store/AdminThunk/ProductThunk";

const Products = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.adminProductState);

  const { nextPage, prevPage } = usePagination();
  const next = () => {
    if (pagination.hasNextPage) {
      const updatedParams = nextPage(); // Get the updated params
      dispatch(FetchProduct(updatedParams.toString()));
    }
  };
  const prev = () => {
    if (pagination.hasPrevPage) {
      const updatedParams = prevPage(); // Get the updated params
      dispatch(FetchProduct(updatedParams.toString()));
    }
  };

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
      {/*pagination */}
      <div className="flex justify-center-safe gap-4  px-4">
        {pagination.hasPrevPage && (
          <button
            onClick={prev}
            className="join-item  btn btn-outline bg-black w"
          >
            <MoveLeft />
            Prev
          </button>
        )}
        {pagination.hasNextPage && (
          <button
            onClick={next}
            className="join-item btn btn-outline bg-black "
          >
            Next
            <MoveRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
