import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  placeOrder: null,
  isLoading: false,
};

export const placeOrder = createAsyncThunk(
  "placeOrder/placeOrder",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_MONGO}/api/place-order/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "placeOrder/fetchOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_MONGO}/api/place-order/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "placeOrder/updateOrder",
  async ({ orderId, order }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_MONGO}/api/place-order/${orderId}`,
        order
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "placeOrder/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_MONGO}/api/place-order/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.placeOrder = action.payload.data;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default placeOrderSlice.reducer;
