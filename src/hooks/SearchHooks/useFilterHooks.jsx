import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useFilterHooks(onClose) {
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

  return{
    resetFilters,
    applyFilters,
    filters,
    setFilters,

  }

}
export default useFilterHooks;