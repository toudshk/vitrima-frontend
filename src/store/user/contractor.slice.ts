import { ApplicantModel } from './../../../../back/src/user/Schemas/user.model';
import { createSlice } from "@reduxjs/toolkit";
import { getStoreLocal } from "@/utils/local-storage";
import {
  checkAuth,
  login,
  logout,
  registerApplicant,
  registerContractor,
} from "./user.actions";
import { IUserInitialState } from './user.interface';

const initialState:IUserInitialState = {
  isLoading: false,
  user: getStoreLocal("contractor"),
};

export const contractorSlice = createSlice({
  name: "contractor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerApplicant.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(registerContractor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(registerContractor.rejected, (state) => {
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

export const { reducer } = contractorSlice;
