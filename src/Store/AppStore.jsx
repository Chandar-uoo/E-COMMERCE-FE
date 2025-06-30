import { configureStore } from "@reduxjs/toolkit";
import  productReducer from "./Slices/ProductSlice";
import userReducer from "./Slices/UserSlice"
import orderReducer from "./Slices/OrderSlice"
export const AppStore = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        order:orderReducer,
    }
})