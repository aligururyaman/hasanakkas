import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/config";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/categories`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/categories/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/categories/${categoryId}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    categories: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
