import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/order" }),
  endpoints: (builder) => ({
    readOrder: builder.query({
      query: () => ({ url: "/read", method: "GET" }),
      providesTags: ["order"],
      transformResponse: (res) => res.result,
    }),
    orderCreation: builder.mutation({
      query: (itemsFromClient) => ({
        url: "/process",
        method: "POST",
        body: itemsFromClient,
      }),
      invalidatesTags: ["order"],
      transformResponse: (res) => res.result,
    }),
  }),
});

export const {
  useReadOrderQuery,
  useOrderCreationMutation,
} = orderApi;
