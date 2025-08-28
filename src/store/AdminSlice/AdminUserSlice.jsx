import { createSlice } from "@reduxjs/toolkit";
import { AdminUserThunk } from "../AdminThunk/AdminUserThunk";
const AdminUserSlice = createSlice({
  name: "adminUserSlice",
  initialState: {
    customers: [],
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      limit: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AdminUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AdminUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(AdminUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});
export const { actions, reducer: adminUserReducer } = AdminUserSlice;
export default adminUserReducer;
