import React from "react";
import { MoveRight, MoveLeft, Plus } from "lucide-react";
import ProductTable from "../../components/admin/ProductComponents/ProductTable";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { Serachproduct } from "../../components/admin/ProductComponents/Serachproduct";
import { FIlterProduct } from "../../components/admin/ProductComponents/FIlterProduct";
import useAdminProductHooks from "../../hooks/AdminProductHooks/useAdminProductHooks";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";
import EmptyState from "../../components/Common/EmptyState";

const Products = () => {
  const nav = useNavigate();

  
  const { nextPage, prevPage } = usePagination();

  const {
    searchProduct,
    settext,
    text,
    availabilityProductStatus,
    isProductsError,
    isProductsLoading,
    products,
    pagination,
    productsError,
    setavailabilityProductStatus,
  } = useAdminProductHooks();
  const next = () => {
    if (pagination.hasNextPage) {
      nextPage(); // Get the updated params
    }
  };
  const prev = () => {
    if (pagination.hasPrevPage) {
      prevPage(); // Get the updated params
    }
  };



  if(isProductsLoading) return <Loader/>;
  if(isProductsError) toast.error(productsError.message || " something went wrong on products");

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <button
          onClick={() => nav("/admin/product-form")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-row justify">
          {/* search */}
          <Serachproduct text={text} settext={settext} searchProduct={searchProduct}  />
          // prop
          {/* filter */}
          <FIlterProduct availabilityStatus={availabilityProductStatus} searchProduct={searchProduct}   setavailabilityStatus={setavailabilityProductStatus} />
        </div>
       
            <ProductTable products={products} />
        
      </div>
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
