import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosInstance";


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/user" }),
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: () => ({ url: "/user-check", method: "GET" }),
      transformResponse: (res) => res.result,
      providesTags:["user"]
    }),

    editUser: builder.mutation({
      query: (formData) => ({
        url: "/update-user",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags:["user"],
      transformResponse: (res) => res.success,
    }),

    passwordUpdate: builder.mutation({
      query: (userUpdates) => ({
        url: "/update-password",
        method: "PATCH",
        body: userUpdates,
      }),
      transformResponse: (res) => res.success,
    }),

    otpEmailSend: builder.mutation({
      query: (email) => ({
        url: "/send-verification-otp",
        method: "POST",
        body: email,
      }),
      transformResponse: (res) => res.success,
    }), // mot good { em/; em}

    otpEmailVerify: builder.mutation({
      query: (data) => ({ url: "/verify-otp", method: "POST", body: data }),
      transformResponse: (res) => res.success,
    }), // mot good { em/; em}
  }),
});

export const {
  useCheckUserQuery,
  useEditUserMutation,
  usePasswordUpdateMutation,
  useOtpEmailSendMutation,
  useOtpEmailVerifyMutation,
} = userApi;

