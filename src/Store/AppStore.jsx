import { configureStore } from "@reduxjs/toolkit";
import  productReducer from "./Slices/ProductSlice";

export const AppStore = configureStore({
    reducer:{
        product:productReducer,

    }
})