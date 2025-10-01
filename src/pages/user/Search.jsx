import React, { useState } from "react";
import EmptyState from "../../components/Common/EmptyState";

import Loader from "../../components/Common/Loader";
import ErrorMessage from "../../components/Common/ErrorMessage";
import ProductFilter from "../../components/user/SearchComponents/ProductFilter";
import usePagination from "../../hooks/usePagination";
import { ProductCard } from "../../components/user/SearchComponents/SearchComponents/ProductCard";
import { PaginationAction } from "../../components/user/SearchComponents/SearchComponents/PaginationAction";
import { SearchPageHeaders } from "../../components/user/SearchComponents/SearchComponents/SearchPageHeaders";
import useSearchHooks from "../../hooks/SearchHooks/useSearchHooks";

const Search = () => {


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { nextPage, prevPage } = usePagination();
  const { sortBy,viewProduct,pagination,error,isLoading,setSortBy,sortedProducts} = useSearchHooks();
  
  const next = () => {
    if (pagination.hasNextPage) {
      nextPage(); 
    }
  };

  const prev = () => {
    if (pagination.hasPrevPage) {
      prevPage(); 
    }
  };

 

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SearchPageHeaders setSortBy={setSortBy} sortBy={sortBy} setSidebarOpen={setSidebarOpen} pagination={pagination}/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {sortedProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <EmptyState message="No products found matching your criteria" />
          </div>
        ) : (
     
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
            {sortedProducts.map((product) => (
                 <ProductCard key={product._id} product={product} viewProduct={viewProduct}/>
            ))}
          </div>
        )}
      </div>
     <PaginationAction pagination={pagination} prev={prev} next={next}/>
      {/* Filter Sidebar */}
      <ProductFilter
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default Search;
