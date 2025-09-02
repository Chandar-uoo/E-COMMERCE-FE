import React, { useState } from "react";
import {  useSearchParams } from "react-router-dom";
import {
  X,
  Filter,
  Search,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { SearchProduct } from "../../store/thunk/ProductThunk";

const ProductFilter = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
   const [searchParams,setSearchParams] = useSearchParams();

  // State for filter options
  const [filters, setFilters] = useState({
    search:  searchParams.get("search") || "",
    category: searchParams.get("category")|| "",
    brand:  searchParams.get("brand")||"",
    tags:  searchParams.get("tags")||"",
    minPrice:  searchParams.get("minPrice")||"",
    maxPrice:  searchParams.get("maxPrice")||"",
    stock:  searchParams.get("stock") || "",
    sortBy: searchParams.get("sortBy")  ||"latest",
  });

  // Handle input changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    // Create filter object, removing empty values
    const filterObj = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
      filterObj.page = 1;
    dispatch(SearchProduct(filterObj));
     const queryString = new URLSearchParams(filterObj).toString();
        setSearchParams(queryString)
    onClose(); // Close the filter panel after applying
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      brand: "",
      tags: "",
      minPrice: "",
      maxPrice: "",
      stock: "",
      sortBy: "latest",
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-base-200 shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-base-300">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Product Filters
          </h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home Decoration</option>
                <option value="kitchen-accessories">Kitchen Accessories</option>
                <option value="laptops">Laptops</option>
                <option value="mens-shirts">Men's Shirts</option>
                <option value="mens-shoes">Men's Shoes</option>
                <option value="mens-watches">Men's Watches</option>
                <option value="mobile-accessories">Mobile Accessories</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="skin-care">Skin Care</option>
                <option value="smartphones">Smartphones</option>
                <option value="sports-accessories">Sports Accessories</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="tablets">Tablets</option>
                <option value="tops">Tops</option>
                <option value="vehicle">Vehicle</option>
                <option value="womens-bags">Women's Bags</option>
                <option value="womens-dresses">Women's Dresses</option>
                <option value="womens-jewellery">Women's Jewellery</option>
                <option value="womens-shoes">Women's Shoes</option>
                <option value="womens-watches">Women's Watches</option>
            </select>
          </div>

          {/* Brand */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Brand</span>
            </label>
            <input
              type="text"
              placeholder="Enter brand name..."
              className="input input-bordered w-full"
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Tags</span>
            </label>
            <input
              type="text"
              placeholder="Enter tags (comma separated)..."
              className="input input-bordered w-full"
              value={filters.tags}
              onChange={(e) => handleFilterChange("tags", e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">
                Separate multiple tags with commas
              </span>
            </label>
          </div>

          {/* Price Range */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Price Range</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                className="input input-bordered w-full"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="input input-bordered w-full"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          {/* Stock */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Stock Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.stock}
              onChange={(e) => handleFilterChange("stock", e.target.value)}
            >
              <option value="">All Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Sort By</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="sold">Most Sold</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button className="btn btn-primary flex-1" onClick={applyFilters}>
              <Search className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
            <button className="btn btn-outline" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
