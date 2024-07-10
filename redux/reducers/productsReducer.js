import { baseUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/products?category=${categoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk action creator to add a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/products`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk action creator to delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk action creator to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Reducer slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIndex = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (updatedIndex !== -1) {
          state.products[updatedIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
