import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/config";

export const fetchOther = createAsyncThunk(
  "other/fetchOther",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/other`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOther = createAsyncThunk(
  "other/addOther",
  async (otherData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/other`, otherData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOther = createAsyncThunk(
  "other/deleteOther",
  async (otherId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/other/${otherId}`);
      return otherId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOther = createAsyncThunk(
  "other/updateOther",
  async ({ otherId, otherData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/other/${otherId}`,
        otherData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otherSlice = createSlice({
  name: "other",
  initialState: {
    loading: false,
    categories: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOther.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOther.fulfilled, (state, action) => {
        state.loading = false;
        state.other = action.payload;
        state.error = null;
      })
      .addCase(fetchOther.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default otherSlice.reducer;
