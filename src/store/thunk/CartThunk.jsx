import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartService, deleteCartService, updateCartService } from "../../api/cartServices";


export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ productId }, { getState, rejectWithValue }) => {
    try {
      const result = await addToCartService(productId);
      const currentCart = getState().cart.cart;
      const updatedCart = [...currentCart];
      
      if (typeof result === "object" && result !== null) {
        // CASE 1: New item, add only if not already present
        const alreadyExists = updatedCart.some(item => item._id === result._id);
        if (!alreadyExists) {
          updatedCart.push(result);
        }
      } else if (typeof result === "object" && result._id) {
        // If already existing, do nothing — backend updated quantity
        const index = updatedCart.findIndex(item => item._id === result._id)
        if (index !== -1) {
          updatedCart[index] = {
            ...updatedCart[index],
            quantity: updatedCart[index].quantity + 1,
          };
        }
      }
      // Optional: clean up any accidental duplicates based on `_id`
      const uniqueCart = Array.from(
        new Map(updatedCart.map(item => [item._id, item])).values()
      );
      return uniqueCart;
    } catch (error) {
      const msg = error?.respone?.data?.message;
      return rejectWithValue(msg);
    }
  }
);
export const updateToCart = createAsyncThunk("updatecart/cart", async ({ productId, quantity }, { getState, rejectWithValue }) => {
  try {
    const data = await updateCartService(productId, quantity);
    const userCart = getState().cart.cart;
    const updation = userCart.map(item => {
      if (item._id == data._id) {
        return {
          ...item,
          quantity: data.quantity,
        }
      } return item;
    })
    return updation;
  } catch (error) {
    const msg = error?.respone?.data?.message;
    return rejectWithValue(msg);

  }
})
export const deleteFromCart = createAsyncThunk(
  "user/deleteFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const result = await deleteCartService(productId);

      // Get current cart from state
      const currentCart = getState().cart.cart;

      // Filter out the deleted product
      const updatedCart = currentCart.filter(item => item.productId._id !== result);
      return updatedCart;

    } catch (error) {
      const msg = error?.respone?.data?.message;
      return rejectWithValue(msg);
    }
  }
);