import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await axios.get(`/api/carts/user/${userId}`);
  return response.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(`/api/carts`, {
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
    const response = await axios.put(`/api/carts`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, itemId }) => {
    await axios.delete(`/api/carts/user/${userId}/item/${itemId}`);
    return itemId;
  }
);

// Kullanıcıya ait tüm sepeti silen thunk
export const deleteAllCartsByUserId = createAsyncThunk(
  "cart/deleteAllCartsByUserId",
  async (userId) => {
    await axios.delete(`/api/carts/user/${userId}`);
    return userId;
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
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteAllCartsByUserId.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
