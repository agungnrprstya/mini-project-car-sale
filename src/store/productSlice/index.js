import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIProducts } from "../../apis/APIProducts";

export const fetchGetProductById = createAsyncThunk("fetch/getProductById", APIProducts.getProductById);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getProductById/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getProductById/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getProductById/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = error.stack;
    });
  },
});

export const selectProduct = (state) => state.product;

export default productSlice.reducer;
