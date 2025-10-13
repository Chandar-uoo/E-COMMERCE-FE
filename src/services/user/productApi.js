import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/product" }),
  endpoints: (builder) => ({
    getProduct: builder.query({ query: (id) => ({ url: `/${id}`, method: "GET" }),transformResponse: (response) => response.result, providesTags:["singleProduct"]}),
    getAllProducts: builder.query({ query: () => ({ url: "/", method: "GET" }),transformResponse: (response) => response.result,providesTags:["Products"] }),
    searchProduct: builder.query({ query: (query) => ({ url: `/search-product?${query}`,method: "GET", }),transformResponse: (response) => response.result }),
     postReview: builder.mutation({
      query: ({ id, comment, rating }) => ({
        url: `/review/${id}`,
        method: "POST",
        body: { comment, rating },
      }),
      transformResponse: (response) => response.result,
      invalidatesTags:["singleProduct"]
    })
  }),
});

export const { useGetProductQuery, useGetAllProductsQuery, useSearchProductQuery, usePostReviewMutation  } = productApi;





