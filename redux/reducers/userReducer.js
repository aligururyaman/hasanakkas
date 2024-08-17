import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user:
    JSON.parse(typeof window !== "undefined" && localStorage.getItem("user")) ||
    "",
  users: [],
  loading: false,
  error: null,
};

export const fetchLoginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/signin`, {
        email,
        password,
      });
      const { data } = response;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the getUser async thunk
export const getUser = createAsyncThunk(
  "fetch/user",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/profile/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the fetch all users async thunk
export const fetchAllUsers = createAsyncThunk(
  "fetch/allUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the auth slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = "";
      state.token = "";
      state.loading = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    loadUserFromLocalStorage: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

// Export the reducer and action creator
export const { signOut, loadUserFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;
