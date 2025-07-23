import { configureStore } from "@reduxjs/toolkit";
import  productReducer from "./Slices/ProductSlice";
import userReducer from "./Slices/UserSlice"
import orderReducer from "./Slices/OrderSlice"
import cartReducer from "./Slices/CartSlice"
import adminUserReducer from "./AdminSlice/AdminUserSlice"
export const AppStore = configureStore({
    reducer:{
        user:userReducer,
        products:productReducer,
        cart:cartReducer,
        order:orderReducer,
        adminUserState:adminUserReducer,
    }
})