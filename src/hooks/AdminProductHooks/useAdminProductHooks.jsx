import { useState } from "react";
import { useFetchProductsQuery } from "../../services/admin/adminProductApi";
import { useSearchParams } from "react-router-dom";

function useAdminProductHooks() {
  const [text, settext] = useState(""); // act as triger mechanisim
  const [availabilityProductStatus, setavailabilityProductStatus] =
    useState("In Stock"); // triger
  const [searchParams, setsearchParams] = useSearchParams();
  const query = searchParams.get("fetch") || "";
  const page = searchParams.get("page") || "1";

  const {
    data,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useFetchProductsQuery({
    fetch: query,
    availabilityStatus: availabilityProductStatus,
    page: Number(page),
  });
  const { data: products, pagination } = data || {};
  const searchProduct = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("fetch", text);
    newParams.set("page", "1");
    setsearchParams(newParams);
  };
  const filterProductStockStatus = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("availabilityStatus", availabilityProductStatus);
    newParams.set("page", "1");
    setsearchParams(newParams);
  };

  return {
    searchProduct,
    settext,
    isProductsError,
    text,
    availabilityProductStatus,
    isProductsLoading,
    products,
    pagination,
    productsError,
    setavailabilityProductStatus,
    filterProductStockStatus,
  };
}
export default useAdminProductHooks;
