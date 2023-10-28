import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIProfiles } from "../../apis/APIProfiles";

export const fetchGetProfileByUid = createAsyncThunk("fetch/getProfileByUid", APIProfiles.getProfileByUid);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getProfileByUid/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addCase("fetch/getProfileByUid/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase("fetch/getProfileByUid/rejected", (state, { error }) => {
      state.status = "failed";
      state.data = error.stack;
    });
  },
});

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
