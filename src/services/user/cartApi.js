import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/cart" }),
  endpoints: (builder) => ({
    readCart: builder.query({
      query: () => ({ url: "/read", method: "GET" }),
      transformResponse: (res) => res.result,
      providesTags: ["cart"],
    }),
    addCart: builder.mutation({
      query: (data) => ({ url: "/add", method: "POST", body: data }),
      transformResponse: (res) => res.result,
      invalidatesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({ url: "/update", method: "PATCH", body: data }),
      transformResponse: (res) => res.result,
      invalidatesTags: ["cart"],
    }),
    deleteCart: builder.mutation({
      query: (data) => ({ url: "/delete", method: "DELETE", body: data }),
      transformResponse: (res) => res.result,
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({ url: "/clear", method: "DELETE" }),
      transformResponse: (res) => res.result,
      invalidatesTags: ["cart"],
    }),
  }),
});
export const {
  useReadCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useClearCartMutation,
} = cartApi;
