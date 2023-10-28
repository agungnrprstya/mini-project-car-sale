import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIInvoices } from "../../apis/APIInvoices";

export const fetchInvoiceByUid = createAsyncThunk("fetch/getInvoiceByUid", APIInvoices.getInvoiceByUid);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getInvoiceByUid/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getInvoiceByUid/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getInvoiceByUid/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = error.stack;
    });
  },
});

export const selectInvoice = (state) => state.invoice;

export default invoiceSlice.reducer;
