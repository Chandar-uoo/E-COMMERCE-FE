import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchProductQuery } from "../../services/user/productApi";
import React, { useState } from "react";

function useSearchHooks() {
  const nav = useNavigate();
 const [sortBy, setSortBy] = useState("relevance");
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const { data, error, isLoading } = useSearchProductQuery(query);
  const products = data?.data;
  const pagination = data?.pagination;
  const viewProduct = async (id) => {
    nav(`/products/${id}`);
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

  return{
    sortBy,viewProduct,pagination,error,isLoading,setSortBy,sortedProducts
  }
}
export default useSearchHooks;
