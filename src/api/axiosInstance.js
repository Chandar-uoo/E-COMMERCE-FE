import axios from "axios";
import config from "../utils/config";
import { tokenService } from "../utils/tokenService";

export const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body, params }) => {
    try {
      const res = await axiosInstance({
        url: baseUrl + url,
        method,
        data: body, // Change 'body' to 'data'
        params,
      });
      return { data: res.data };
    } catch (err) {
      console.log(err);

      return {
        error: {
          status: err.status || err.response?.status || 500, // ✅ Gets actual status
          message: err.message || "An error occurred", // ✅ Gets actual message
          data: err.response?.data,
        },
      };
    }
  };
// Request interceptor: inject token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.get();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor: handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 1. 🔁 Refresh token on 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.get(
          `${config.API_URL}/auth/refresh-token`,
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        tokenService.set(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject({
          message: "Please login again.",
          status: 401,
          raw: refreshError,
        });
      }
    }
    // 2. 🌐 Handle Network or CORS errors
    if (!error.response) {
      return Promise.reject({
        message: "Network Error. Please check your connection .",
        status: 500,
        raw: error,
      });
    }
    // 3. 🚫 Handle 403 Forbidden
    if (error.response.status === 403) {
      return Promise.reject({
        message: "You are not authorized to perform this action.",
        status: 403,
        raw: error,
      });
    }
    // 4. 🔁 429 Too Many Requests
    if (error.response.status === 429) {
      return Promise.reject({
        message: "Too many requests. Please try again later.",
        status: 429,
        raw: error,
      });
    }
    // 5. ❌ Backend validation errors (400 or 422)
    if ([400, 401, 403, 422,409].includes(error.response.status)) {
      return Promise.reject({
        message: error.response.data.message || "Validation failed.",
        status: error.response.status,
        raw: error,
      });
    }
    // 6. 💥 Catch-all for 5xx errors
    return Promise.reject({
      message: "Something went wrong on the server.",
      status: error.response.status,
      raw: error,
    });
  }
);
