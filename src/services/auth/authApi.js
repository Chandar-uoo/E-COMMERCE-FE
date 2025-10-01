import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginCredetials) => ({
        url: "/login",
        method: "POST",
        body: loginCredetials,
      }),
      transformResponse: (res) => res,
    }),
    signup: builder.mutation({
      query: (data) => ({ url: "/signup", method: "POST", body: data }),
      transformResponse: (res) => res,
    }),
    logout: builder.mutation({
      query: () => ({ url: "/logout", method: "GET" }),
      transformResponse: (res) => res,
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
