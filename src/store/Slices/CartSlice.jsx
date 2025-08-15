// src/store/Slices/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addToCart, updateToCart, deleteFromCart, readCart } from "../thunk/CartThunk";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false, // ✅ added
    error: null,    // ✅ already had
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
    // read
    .addCase(readCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(readCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE CART
      .addCase(updateToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // DELETE FROM CART
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addCartItem, clearCartState } = CartSlice.actions;
export default CartSlice.reducer;
