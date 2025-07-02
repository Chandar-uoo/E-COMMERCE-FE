import { createSlice } from "@reduxjs/toolkit";
import { addToCart, updateToCart,deleteFromCart } from "../thunk/CartThunk";

const initialState = {
    user : null,
};
const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        adduser:(state,action)=>{
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
          if (state.user) {
            state.user.cart = action.payload;
          }
        });
        builder.addCase(updateToCart.fulfilled, (state, action) => {
          state.user.cart = action.payload;
        });
        builder
            .addCase(deleteFromCart.fulfilled, (state, action) => {
              state.user.cart = action.payload;
            })
      },
     

})

export const {adduser} = UserSlice.actions;
export default UserSlice.reducer;

