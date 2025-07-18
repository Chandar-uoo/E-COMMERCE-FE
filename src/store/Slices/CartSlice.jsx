import { createSlice } from "@reduxjs/toolkit"
import { addToCart, updateToCart, deleteFromCart } from "../thunk/CartThunk";
const initialState = {  // ✅ fixed spelling here
  cart: [],
  error: null
}
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cart = action.payload;
    }
  },
  extraReducers: (builder) => {
    // addToCart
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.payload || "something went wrong"
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    //updateToCart
    builder.addCase(updateToCart.rejected, (state, action) => {
      state.error = action.payload || "something went wrong"
    })
    builder.addCase(updateToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    // deleteFromCart
    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.error = action.payload || "something went wrong"
    })
    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    })
  },
})

export const { addCartItem } = CartSlice.actions;
export default CartSlice.reducer;
