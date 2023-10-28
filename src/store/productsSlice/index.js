import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIProducts } from "../../apis/APIProducts";

export const fetchGetProducts = createAsyncThunk("fetch/getProducts", APIProducts.getProducts);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getProducts/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getProducts/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getProducts/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = error.stack;
    });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
