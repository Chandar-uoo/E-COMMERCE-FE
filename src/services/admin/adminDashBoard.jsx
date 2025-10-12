import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";

export const adminDashBoardApi = createApi({
  reducerPath: "adminDashBoardApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/admin/admin-dash-board" }),
  endpoints: (builder) => ({
    // Fetch all users
     fetchDashBoard: builder.query({
      query: () => ({ url: "", method: "GET" }),
      transformResponse: (res) => res.result,
    }),
  }),
});

// Export auto-generated hooks
export const { useFetchDashBoardQuery } = adminDashBoardApi;
