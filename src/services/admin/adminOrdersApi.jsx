import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";


export const adminOrderApi = createApi({
  reducerPath: "adminOrderApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/admin/order" }),
  endpoints: (builder) => ({
    // Fetch all orders
    fetchOrders: builder.query({
      query: (params) => ({ url: "", method: "GET",params }),
      transformResponse: (res) => res.result,
      providesTags:["orderList"]
    }),
    // Update order status
    updateOrderStatus: builder.mutation({
      query: (orderId) => ({ url: `/update-order-status/${orderId}`, method: "PATCH" }),
      transformResponse: (res) => res.result,
      invalidatesTags:["orderList"]
    }),
  }),
});

// Export auto-generated hooks
export const {
  useFetchOrdersQuery,
  useUpdateOrderStatusMutation,
} = adminOrderApi;
