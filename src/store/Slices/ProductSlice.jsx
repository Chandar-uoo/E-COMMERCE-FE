import { createSlice } from "@reduxjs/toolkit";
import {
  FetchProducts,
  FetchProductById,
  SearchProduct,
} from "../thunk/ProductThunk";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    selectedProduct: null,
    search: {
      data: [], // products for search results
      meta: {
        pagination: {
          totalItems: 0,
          totalPages:0,
          currentPage: 0,
          limit: 0,
          hasNextPage:false,
          hasPrevPage:false,
        },
      },
    },
    refreshing: false,
    loading: false,
    error: null,
  },
  reducers: {
    Add: (state, action) => {
      state.products = action.payload;
    },
    Delete: (state) => {
      state.products = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch product
      .addCase(FetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(FetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // selected product
      .addCase(FetchProductById.pending, (state) => {
        // If we already have a product, switch to "refreshing" to avoid flicker.
        if (state.selectedProduct) {
          state.refreshing = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(FetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
        state.refreshing = false;
      })
      .addCase(FetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload;
      })
      .addCase(SearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchProduct.fulfilled, (state, action) => {
        state.search.data = action.payload.data;
        state.search.meta.pagination = action.payload.pagination;
          state.loading = false;
      })
      .addCase(SearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { Add, Delete, clearError } = productSlice.actions;
export default productSlice.reducer;
