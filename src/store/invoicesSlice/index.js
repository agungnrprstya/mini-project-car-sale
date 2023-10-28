import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIInvoices } from "../../apis/APIInvoices";

export const fetchGetInvoices = createAsyncThunk("fetch/getInvoices", APIInvoices.getInvoices);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getInvoices/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getInvoices/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getInvoices/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = error.stack;
    });
  },
});

export const selectInvoices = (state) => state.invoices;

export default invoicesSlice.reducer;
