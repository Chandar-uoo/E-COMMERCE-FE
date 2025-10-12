import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../services/user/productApi";
import { userApi } from "../services/user/userApi";
import { authApi } from "../services/auth/authApi";
import { cartApi } from "../services/user/cartApi";
import { orderApi } from "../services/user/orderApi";
import { adminCustomerApi } from "../services/admin/adminCustomerApi";
import { adminOrderApi } from "../services/admin/adminOrdersApi";
import { adminProductApi } from "../services/admin/adminProductApi";
import { adminDashBoardApi } from "../services/admin/adminDashBoard";

export const AppStore = configureStore({
  reducer: {
    /*user*/
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    /*admin*/
    [adminCustomerApi.reducerPath]:adminCustomerApi.reducer,
    [adminOrderApi.reducerPath]:adminOrderApi.reducer,
    [adminProductApi.reducerPath]:adminProductApi.reducer,
    [adminDashBoardApi.reducerPath]:adminDashBoardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware)
      .concat(adminOrderApi.middleware)
      .concat(adminProductApi.middleware)
      .concat(adminCustomerApi.middleware)
      .concat(adminDashBoardApi.middleware),
});
