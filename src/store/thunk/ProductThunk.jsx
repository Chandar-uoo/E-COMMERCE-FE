import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProduct, searchService } from "../../api/productService";


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

export const FetchProductById =  createAsyncThunk("productById/fetch",
  async (id,{rejectWithValue}) => {
    try {
      const res = await getProduct(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    } 
  }
);
  export const SearchProduct =  createAsyncThunk("productSearch/fetch",
  async (filterObj,{rejectWithValue}) => {
    try {
      const query = new URLSearchParams(filterObj);
      const res = await searchService(query.toString());
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    } 
  }
)
