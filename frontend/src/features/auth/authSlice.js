import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserAPI,
  registerUserAPI,
  sendOtpAPI,
  verifyOtpAPI,
  resetPasswordAPI
} from "./authAPI";

const initialState = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
  token: sessionStorage.getItem("token") || null,
  loading: false,
  error: null,
  message: null
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerUserAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginUserAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (data, thunkAPI) => {
    try {
      const res = await sendOtpAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP send failed"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    try {
      const res = await verifyOtpAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await resetPasswordAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Password reset failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },

    clearMessage: (state) => {
      state.error = null;
      state.message = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.message = null;
    },

    setMessage: (state, action) => {
      state.message = action.payload;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearMessage, setError, setMessage } = authSlice.actions;

export default authSlice.reducer;