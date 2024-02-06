import { AuthService } from "@/services/auth/auth.service";
import { toast } from 'react-toastify'

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ISignUpContractor,
  ISignUpApplicant,
  InterfaceEmailPassword,
  IAuthApplicantResponse,
  IAuthResponse,
  IAuthContractorResponse,
} from "./user.interface";
import { errorCatch } from "@/api/api.helpers";
import { redirect } from "next/navigation";

export const registerApplicant = createAsyncThunk<
  IAuthApplicantResponse,
  ISignUpApplicant
>(
  "auth/register/applicant",
  async ({ email, password, nickname }, thunkApi) => {
    try {
      const response = await AuthService.registerApplicant(
        email,
        password,
        nickname,
        
      );
      toast.success("Вы успешно зарегистрировались! Пожалуйста, подтвердите вашу почту, на нее уже отправлено письмо")
     
      return response.data;
    } catch (error) {
      
      toast.error("Ошибка, попробуйте снова")
     
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const registerContractor = createAsyncThunk<
  IAuthContractorResponse,
  ISignUpContractor
>(
  "auth/register/contractor",
  async ({ email, password, nickname, inn }, thunkApi) => {
    try {
      const response = await AuthService.registerContractor(
        email,
        password,
        nickname,
        inn
      );
      toast.success("Вы успешно зарегистрировались! Пожалуйста, подтвердите вашу почту, на нее отправлено уже письмо")
     
      return response.data;
    } catch (error) {
      toast.error("Ошибка, попробуйте снова")
     
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password);
     
      return response.data;
    }catch (error) {
        console.error('Не удалось получить текст ошибки.');
      
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const checkAuth = createAsyncThunk<
  IAuthResponse
>("auth/check-auth", async (_, thunkApi) => {
  try {
    const response = await AuthService.getNewTokens();
    return response.data;
  } catch (error) {
    if (errorCatch(error) === "токен не является строкой") {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(error);
  }
});
