import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../api/productService";


export const FetchProducts = createAsyncThunk(
  "product/fetch",
  async (_, {  rejectWithValue }) => {
    try {
      const res = await getAllProducts(); 
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

