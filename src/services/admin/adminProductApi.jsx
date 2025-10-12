import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";

export const adminProductApi = createApi({
  reducerPath: "adminProductApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/admin/product" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (params) => ({ url: "", method: "GET" , params}),
      transformResponse:(res)=>res.result,
      providesTags:["AdminProducts"],
    }),
    addProduct:builder.mutation({
        query:(updateFields)=>({url:"/add-product", method:"POST" , body:updateFields}),
        transformResponse:(res)=>res.result,
        invalidatesTags:["AdminProducts"]
    }),
    updateProduct:builder.mutation({query:(updateFields)=>({url:"/update-product" ,method:"PATCH",body:updateFields}),transformResponse:(res)=>res.result ,invalidatesTags:["AdminProducts"]}),
    deleteProduct:builder.mutation({query:(id)=>({url:`/delete-product/${id}` ,method:"DELETE"}),
        transformResponse:(res)=>res.result,invalidatesTags:["AdminProducts"]})
  }),
});
export const {
  useFetchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductApi;