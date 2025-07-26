import { createSlice } from "@reduxjs/toolkit";
import { FetchOrdersThunk, UpdateOrderStatusThunk } from "../AdminThunk/AdminOrderThunk";
const OrderSlice =  createSlice({
    name: "adminOrder",
    initialState: { 
        orders: [],
        loading: false,     
        error: null
    },  
    reducers: {},
    extraReducers: (builder) => {   
        builder
            .addCase( FetchOrdersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase( FetchOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase( FetchOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            // update order status 
            builder
             .addCase( UpdateOrderStatusThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase( UpdateOrderStatusThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase( UpdateOrderStatusThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
            
})
export const { actions, reducer: adminOrderReducer } = OrderSlice;
export default adminOrderReducer;