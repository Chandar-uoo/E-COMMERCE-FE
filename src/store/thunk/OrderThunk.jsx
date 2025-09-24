import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  orderMakeService,
  orderpaymentService,
  readOrder,
} from "../../api/orderServices";

export const readOrders = createAsyncThunk(
  "order/read",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await readOrder();
      return orders;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

export const orderMaking = createAsyncThunk(
  "order/making",
  async ({ itemsFromClient }, { rejectWithValue }) => {
    try {
      const  {order,razorPay} = await orderMakeService(itemsFromClient);     
      return {order,razorPay} ;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const orderpayment = createAsyncThunk(
  "order/payment",
  async ({ orderId, paymentMethod }, { rejectWithValue }) => {
    try {
      await orderpaymentService(orderId, paymentMethod);
      const orders = await readOrder();
      return orders;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
