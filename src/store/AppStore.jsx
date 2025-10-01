import { configureStore } from "@reduxjs/toolkit";
import adminUserReducer from "./AdminSlice/AdminUserSlice";
import adminOrderReducer from "./AdminSlice/AdminOrderSlice";
import adminProductReducer from "./AdminSlice/AdminProductSlice";
import { productApi } from "../services/user/productApi";
import { userApi } from "../services/user/userApi";
import { authApi } from "../services/auth/authApi";
import { cartApi } from "../services/user/cartApi";
import { orderApi } from "../services/user/orderApi";

export const AppStore = configureStore({
  reducer: {
    /*user*/
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    /*admin*/
    adminUserState: adminUserReducer,
    adminOrderState: adminOrderReducer,
    adminProductState: adminProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware),
});
