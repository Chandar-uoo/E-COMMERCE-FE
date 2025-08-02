import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../api/AdminApi's/orderService";

export const FetchOrdersThunk = createAsyncThunk(
  "admin/fetchOrders",
  async (status, { rejectWithValue }) => {
    try {
      const response = await fetchOrders(status);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const UpdateOrderStatusThunk = createAsyncThunk(
  "admin/updateOrderStatus",
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(orderId);
      const state = getState().adminOrderState.orders;
      const updatedOrders = state.map((order) =>
        order._id === orderId ? { ...order, status: response.status } : order
      );
      return updatedOrders;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
