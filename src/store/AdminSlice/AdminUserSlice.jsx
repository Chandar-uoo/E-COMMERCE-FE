import { createSlice } from "@reduxjs/toolkit";
import { AdminUserThunk } from "../AdminThunk/AdminUserThunk";
const AdminUserSlice = createSlice({
    name:"adminUserSlice",
    initialState: {
        customers: [],
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
            state.customers = action.payload;
          })
          .addCase(AdminUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch users";
          });
      },


})
export const { actions, reducer: adminUserReducer } = AdminUserSlice;
export default adminUserReducer;
