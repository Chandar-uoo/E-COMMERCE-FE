import { createSlice } from "@reduxjs/toolkit"
import { FetchProducts } from "../thunk/ProductThunk";

 const productSlice = createSlice({
    name:"productSlice",
    initialState:{
        products : [],
        loading: false,
        error:null
    },
    reducers:{
        Add:(state,action)=>{
            state.products = action.payload;
        },
        Delete:(state)=>{
            state.products = [];
        },
         clearError:(state)=>{
            state.error = null;
        },

    },
    extraReducers:(builder)=>{
        builder
        // fetch product
        .addCase(FetchProducts.pending,(state)=>{
           state.loading = true;
            state.error = null;
        })
        .addCase(FetchProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(FetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

    }
 })
 export const {Add,Delete,clearError} = productSlice.actions;
 export default productSlice.reducer;

