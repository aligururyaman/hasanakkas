import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = process.env.REACT_APP_API_URL || "http://51.20.135.157:2000";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await axios.get(`${serverUrl}/api/carts/user/${userId}`);
  return response.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${serverUrl}/api/carts`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(`${serverUrl}/api/carts`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, itemId }) => {
    await axios.delete(`${serverUrl}/api/carts/user/${userId}/item/${itemId}`);
    return itemId;
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
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
