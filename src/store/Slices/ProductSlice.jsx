import { createSlice } from "@reduxjs/toolkit"
import {FetchProduct,AddProduct,UpdateProduct,DeleteProduct} from "../thunk/ProductThunk"

 const productSlice = createSlice({
    name:"productSlice",
    initialState:{
        products : [],
        status : "idle",
        error:null
    },
    reducers:{
        Add:(state,action)=>{
            state.products = action.payload;
        },
        Delete:(state)=>{
            state.products = [];
        }
    },
    extraReducers:(builder)=>{
        builder
        // fetch product
        .addCase(FetchProduct.pending,(state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(FetchProduct.fulfilled,(state,action)=>{
            state.status = "success"
            state.products = action.payload;
        })
        .addCase(FetchProduct.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
        // add product
        .addCase(AddProduct.pending,(state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(AddProduct.fulfilled,(state,action)=>{
             state.status = "success"
            state.products = action.payload;
        })
        .addCase(AddProduct.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
        // upadte product
        .addCase(UpdateProduct.pending,(state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(UpdateProduct.fulfilled,(state,action)=>{
             state.status = "success"
            state.products = action.payload;
        })
        .addCase(UpdateProduct.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
        // DeleteProduct
        .addCase(DeleteProduct.pending,(state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(DeleteProduct.fulfilled,(state,action)=>{
             state.status = "success"
            state.products = action.payload;
        })
        .addCase(DeleteProduct.rejected,(state,action)=>{
             state.status = "failed";
            state.error = action.payload;
        })
    }
 })
 export const {Add,Delete} = productSlice.actions;
 export default productSlice.reducer;

