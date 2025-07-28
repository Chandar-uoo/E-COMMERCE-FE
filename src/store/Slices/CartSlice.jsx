// src/store/Slices/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addToCart, updateToCart, deleteFromCart } from "../thunk/CartThunk";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    error: null,
  },
  reducers: {
    addCartItem: (state, action) => {
      state.cart = action.payload;
    },
    clearCartState: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { addCartItem, clearCartState } = CartSlice.actions;
export default CartSlice.reducer;
