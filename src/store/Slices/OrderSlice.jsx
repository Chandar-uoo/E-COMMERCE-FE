import { createSlice } from "@reduxjs/toolkit";
import { orderMaking, orderpayment } from "./OrderThunk";

const initialState ={
    order :[],
    orderId :null,
}
const OrderSlice = createSlice({
name:'order',
initialState,
reducers:{},
    extraReducers: (builder) => {
        builder.addCase(orderMaking.fulfilled, (state,action) => {
          state.order = action.payload.uniqueorders;
          state.orderId = action.payload.orderId;
        });
        builder.addCase(orderpayment.fulfilled,(state,action)=>{
          state.order = action.payload;
        })
      }

}
)
export default OrderSlice.reducer;