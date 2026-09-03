import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAdmins } from "../../apis/APIAdmins";

export const fetchGetAdmins = createAsyncThunk("fetch/getAdmins", APIAdmins.getAdmins);

const initialState = {
  message: "",
  status: "idle",
  data: [],
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getAdmins/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getAdmins/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getAdmins/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = [];
      state.message = error?.message || "Failed to get admins";
    });
  },
});

export const selectAdmins = (state) => state.admins;

export default adminsSlice.reducer;
