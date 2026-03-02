import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBuyersAPI } from "./buyerAPI";

const initialState = {
  buyers: [],
  loading: false,
  error: null,
};

export const fetchBuyers = createAsyncThunk(
  "buyer/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const res = await fetchBuyersAPI(token);

      return res.data.data;

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch buyers"
      );
    }
  }
);

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.loading = false;
        state.buyers = action.payload;
      })
      .addCase(fetchBuyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerSlice.reducer;