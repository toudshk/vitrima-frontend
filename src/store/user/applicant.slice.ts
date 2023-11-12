import { createSlice } from "@reduxjs/toolkit";
import { IUserInitialState } from "./user.interface";
import { getStoreLocal } from "@/utils/local-storage";
import {
  checkAuth,
  login,
  logout,
  registerApplicant,
  registerContractor,
} from "./user.actions";

const initialState: IUserInitialState = {
  user: getStoreLocal("user"),
  isLoading: false,
};

export const applicantSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerApplicant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerApplicant.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(registerApplicant.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      });
  },
});

export const { reducer } = applicantSlice;
