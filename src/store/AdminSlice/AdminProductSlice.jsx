import { createSlice } from "@reduxjs/toolkit"
import {FetchProduct,AddProduct,UpdateProduct,DeleteProduct} from "../AdminThunk/ProductThunk"

 const AdminProductSlice = createSlice({
    name:"adminProductSlice",
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
        .addCase(FetchProduct.pending,(state)=>{
           state.loading = true;
            state.error = null;
        })
        .addCase(FetchProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(FetchProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // add product
        .addCase(AddProduct.pending,(state)=>{
           state.loading = true;
            state.error = null;
        })
        .addCase(AddProduct.fulfilled,(state,action)=>{
             state.loading = false;
            state.products = action.payload;
        })
        .addCase(AddProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // upadte product
        .addCase(UpdateProduct.pending,(state)=>{
           state.loading = true;
            state.error = null;
        })
        .addCase(UpdateProduct.fulfilled,(state,action)=>{
             state.loading = false;
            state.products = action.payload;
        })
        .addCase(UpdateProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // DeleteProduct
        .addCase(DeleteProduct.pending,(state)=>{
           state.loading = true;
            state.error = null;
        })
        .addCase(DeleteProduct.fulfilled,(state,action)=>{
             state.loading = false;
            state.products = action.payload;
        })
        .addCase(DeleteProduct.rejected,(state,action)=>{
             state.loading = false;;
            state.error = action.payload;
        })
    }
 })
 export const {Add,Delete,clearError} = AdminProductSlice.actions;
 export default AdminProductSlice.reducer;

