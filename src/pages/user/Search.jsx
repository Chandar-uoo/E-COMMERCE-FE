import React, { useState } from "react";
import {  useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Filter,
  MoveLeft,
  MoveRight,
  SlidersHorizontal,
  Search as SearchIcon,
  Eye,
} from "lucide-react";
import EmptyState from "../../components/Common/EmptyState";
import {
  FetchProductById,
  SearchProduct,
} from "../../store/thunk/ProductThunk";
import Loader from "../../components/Common/Loader";
import ErrorMessage from "../../components/Common/ErrorMessage";
import ProductFilter from "../../components/user/ProductFilter";
import usePagination from "../../hooks/usePagination";

const Search = () => {
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.search.data);
  const pagination = useSelector(
    (state) => state.products.search.meta.pagination
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { nextPage, prevPage } = usePagination();

  const next = () => {
    if (pagination.hasNextPage) {
      const updatedParams = nextPage(); // Get the updated params
      dispatch(SearchProduct(updatedParams.toString()));
    }
  };

  const prev = () => {
    if (pagination.hasPrevPage) {
      const updatedParams = prevPage(); // Get the updated params
      dispatch(SearchProduct(updatedParams.toString()));
    }
  };

  const viewProduct = async (id) => {
    const result = dispatch(FetchProductById(id));
    if (!result.error) {
      nav(`/products/${id}`);
    }
  };

  // Sort products
  const sortedProducts = React.useMemo(() => {
    if (!products) return [];

    const sorted = [...products];
    switch (sortBy) {
      case "price_low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name_az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "name_za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>

                <p className="text-sm text-gray-500">
                  {pagination.totalItems || 0} products found
                </p>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered text-black select-sm bg-white border-gray-200 focus:border-blue-500 min-w-[140px]"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_az">Name: A-Z</option>
                  <option value="name_za">Name: Z-A</option>
                </select>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="btn btn-outline btn-sm gap-2 border-blue-500 text-blue-600"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {sortedProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <EmptyState message="No products found matching your criteria" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/300"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => viewProduct(product._id)}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none gap-1 px-4"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
      {/* Filter Sidebar */}
      <ProductFilter
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default Search;
