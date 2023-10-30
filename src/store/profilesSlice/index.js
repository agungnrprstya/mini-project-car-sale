import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIProfiles } from "../../apis/APIProfiles";

export const fetchGetProfiles = createAsyncThunk("fetch/getProfiles", APIProfiles.getProfiles);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getProfiles/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getProfiles/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getProfiles/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = error.stack;
    });
  },
});

export const selectProfiles = (state) => state.profiles;

export default profilesSlice.reducer;
