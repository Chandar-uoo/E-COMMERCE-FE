import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartService, deleteCartService, updateCartService,readCartService } from "../../api/cartServices";

// ✅ Add product and then fetch updated cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      await addToCartService(productId);
      const updatedCart = await readCartService();
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Add to cart failed");
    }
  }
);

// ✅ Update quantity and fetch updated cart
export const updateToCart = createAsyncThunk(
  "cart/updateToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartService(productId, quantity);
      const updatedCart = await readCartService();
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Update cart failed");
    }
  }
);

// ✅ Delete item and fetch updated cart
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteCartService(productId);
      const updatedCart = await readCartService();
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Delete cart failed");
    }
  }
);
