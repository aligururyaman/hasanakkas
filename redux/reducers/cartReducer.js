import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/config"; // baseUrl içe aktarımı

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, item);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/remove`, {
        data: item,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/clear/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
