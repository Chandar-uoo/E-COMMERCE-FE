import { configureStore } from "@reduxjs/toolkit";
import  productReducer from "./Slices/ProductSlice";
import userReducer from "./Slices/UserSlice"
import orderReducer from "./Slices/OrderSlice"
import cartReducer from "./Slices/CartSlice"
import adminUserReducer from "./AdminSlice/AdminUserSlice"
import adminOrderReducer from "./AdminSlice/AdminOrderSlice";
import adminProductReducer from "./AdminSlice/AdminProductSlice"
export const AppStore = configureStore({
    reducer:{
        /*user*/
        user:userReducer,
        products:productReducer,
        cart:cartReducer,
        order:orderReducer,
        /*admin*/
        adminUserState:adminUserReducer,
        adminOrderState:adminOrderReducer,
        adminProductState:adminProductReducer
    }
})