import { createSlice } from "@reduxjs/toolkit";
import { orderMaking, orderpayment, readOrders } from "../thunk/OrderThunk";

const initialState = {
  order: [],
  currentOrder: null,
  loading: false,
  error: null,
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = [];
      state.currentOrder = null;
      state.error = null;

    },
  },
  extraReducers: (builder) => {
    builder
      // read order
      .addCase(readOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(readOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // order start
      .addCase(orderMaking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderMaking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;      

      })
      .addCase(orderMaking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      })
      // order payment
      .addCase(orderpayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderpayment.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.currentOrder = null;
      })
      .addCase(orderpayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      });
  },
});
export const {  clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
