import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mainUrl } from "@/config";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${mainUrl}/api/categoriesRoute`);
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
      const response = await axios.post(
        `${mainUrl}/api/categoriesRoute`,
        categoryData
      );
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
      await axios.delete(`${mainUrl}/api/categoriesRoute?id=${categoryId}`);
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
        `${mainUrl}/api/categoriesRoute?id=${categoryId}`,
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
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
