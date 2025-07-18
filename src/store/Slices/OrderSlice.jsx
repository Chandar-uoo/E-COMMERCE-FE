import { createSlice } from "@reduxjs/toolkit";
import { orderMaking, orderpayment } from "../thunk/OrderThunk";

const initialState = {
  order: [],
  orderId: null,
  error: null,
}
const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrders:(state,action)=>{
      state.order = action.payload;
    }
  },
  extraReducers: (builder) => {
    // order start
    builder.addCase(orderMaking.rejected, (state, action) => {
      state.error =  action.payload || "something went wrong"
    })
    builder.addCase(orderMaking.fulfilled, (state, action) => {
      state.order = action.payload.uniqueorders;
      state.orderId = action.payload.orderId;
    });
    // order payment
    builder.addCase(orderpayment.rejected, (state, action) => {
      state.error = action.payload || "something went wrong"
    })
    builder.addCase(orderpayment.fulfilled, (state, action) => {
      state.order = action.payload;
    })
  }

}
)
export const {addOrders} =  OrderSlice.actions;
export default OrderSlice.reducer;