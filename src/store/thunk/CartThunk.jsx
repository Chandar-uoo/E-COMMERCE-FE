import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartService,
  deleteCartService,
  updateCartService,
  readCartService,
} from "../../api/cartServices";

// Add product and then fetch updated cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      await addToCartService(productId);
      const updatedCart = await readCartService();
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// Update quantity and fetch updated cart
export const updateToCart = createAsyncThunk(
  "cart/updateToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartService(productId, quantity);
      const updatedCart = await readCartService();
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// Delete item and fetch updated cart
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteCartService(productId);
      const updatedCart = await readCartService();
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
