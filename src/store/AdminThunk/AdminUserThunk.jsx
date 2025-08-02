import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/AdminApi's/userService";

export const AdminUserThunk = createAsyncThunk(
  "user/addToCart",
  async (user, { getState, rejectWithValue }) => {
    try {
      const response = await fetchUsers(user);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
