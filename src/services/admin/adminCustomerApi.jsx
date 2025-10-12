import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";

export const adminCustomerApi = createApi({
  reducerPath: "adminUserApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/admin/user" }),
  endpoints: (builder) => ({
    // Fetch all users
    fetchCustomers: builder.query({
      query: (params) => ({ url: "", method: "GET" ,params}),
      transformResponse: (res) => res.result,
    }),
  }),
});

// Export auto-generated hooks
export const { useFetchCustomersQuery } = adminCustomerApi;
