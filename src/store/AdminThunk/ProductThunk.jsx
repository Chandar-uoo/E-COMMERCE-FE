import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../api/AdminApi's/adminServices";

export const FetchProduct = createAsyncThunk(
  "products/fetch",
  async (text, { getState, rejectWithValue }) => {
    try {
      const data = await fetchProducts(text);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const AddProduct = createAsyncThunk(
  "products/addProduct",
  async ({ updateFields }, { getState, rejectWithValue }) => {
    try {
      const data = await addProduct(updateFields);
      const currProducts = getState().products.products;
      const updateProducts = [...currProducts];
      if (typeof data === "object" && data !== null) {
        updateProducts.push(data);
      }
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const UpdateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updateFields }, { getState, rejectWithValue }) => {
    try {
      const data = await updateProduct(id, updateFields);
      const currProducts = getState().products.products;

      if (typeof data === "object" && data !== null) {
        const removeProduct = currProducts.filter((item) => item._id !== id);
        return [...removeProduct, data];
      }
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const DeleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      console.log(id);
      const data = await deleteProduct(id);
      if (typeof data === "object" && data !== null) {
        const currProducts = getState().products.products;
        const updatedProducts = currProducts.filter(
          (item) => item._id !== data._id
        );
        return updatedProducts;
      }
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
