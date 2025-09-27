import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/products" }),
  endpoints: (builder) => ({
    getProduct: builder.query({ query: (id) => ({ url: `/${id}`, method: "GET" }),transformResponse: (response) => response.result, }),
    getAllProducts: builder.query({ query: () => ({ url: "/", method: "GET" }),transformResponse: (response) => response.result, }),
    searchProduct: builder.query({ query: (query) => ({ url: `/search-product?${query}`,method: "GET", }),transformResponse: (response) => response.result }),
  }),
});

export const { useGetProductQuery, useGetAllProductsQuery, useSearchProductQuery } = productApi;





