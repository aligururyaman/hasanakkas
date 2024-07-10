import { baseUrl } from "@/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios

// Define the initial state
const initialState = {
  user: "",
  users: [],
  loading: false,
  error: null,
};

// Tarayıcıda olduğumuzu kontrol edin ve localStorage'dan user bilgisini alın
if (typeof window !== "undefined") {
  initialState.user = JSON.parse(localStorage.getItem("user")) || "";
}

// Define the fetchLoginUser async thunk
export const fetchLoginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/signin`, {
        email,
        password,
      });
      // Assuming the response includes user data and token
      const { data } = response;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data.user;
    } catch (error) {
      throw error;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async ({ firstName, lastName, email, password }) => {
    const response = await axios.post(`${baseUrl}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  }
);

// Define the getUser async thunk
export const getUser = createAsyncThunk("fetch/user", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/user/profile?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the fetch all users async thunk
export const fetchAllUsers = createAsyncThunk("fetch/allUsers", async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

// Export the reducer and action creator
export const { signOut } = userSlice.actions;
export default userSlice.reducer;
