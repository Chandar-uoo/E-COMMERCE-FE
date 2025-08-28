// usePagination.jsx
import { useSearchParams } from "react-router-dom";

function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  
  const nextPage = () => {
    const newParams = new URLSearchParams(searchParams);
    const nextPageNum = page + 1;
    newParams.set("page", nextPageNum);
    setSearchParams(newParams);
    return newParams; // Return the new params for immediate use
  };

  const prevPage = () => {
    const newParams = new URLSearchParams(searchParams);
    const prevPageNum = page - 1;
    newParams.set("page", prevPageNum);
    setSearchParams(newParams);
    return newParams; // Return the new params for immediate use
  };

  return { 
    currentParams: searchParams, 
    page,
    nextPage, 
    prevPage 
  };
}

export default usePagination;