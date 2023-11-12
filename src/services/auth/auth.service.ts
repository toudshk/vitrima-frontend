import axios from "axios";
import Cookies from "js-cookie";

import { IAuthApplicantResponse, IAuthContractorResponse, IAuthResponse } from "@/store/user/user.interface";
import { removeTokensStorage, saveToStorage } from "./auth.helper";
import { API_URL, getAuthUrl } from "@/config/api.config";
import { getContentType } from "@/api/api.helpers";
import { axiosClassic } from "@/api/interceptors";

export const AuthService = {
  async registerApplicant(email: string, password: string, nickname: string) {
    const response = await axiosClassic.post<IAuthApplicantResponse>(
      `${API_URL}${getAuthUrl("/register/applicant")}`,
      {
        email,
        password,
        nickname,
      

      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
   
    return response;
  },
  async registerContractor(
    email: string,
    password: string,
    nickname: string,
    inn: string,
   
  ) {
    const response = await axios.post<IAuthContractorResponse>(
      `${API_URL}${getAuthUrl("/register/contractor")}`,
      {
        email,
        password,
        nickname,
        inn,
    
      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },

  async login(email: string, password: string) {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}${getAuthUrl("/login")}`,
      {
        email,
        password,
      }
    );
console.log(response)
    if (response.data.accessToken) {

      saveToStorage(response.data);
    }
    

    return response;
  },
  logout() {
    removeTokensStorage();
    localStorage.removeItem("user");
  },
  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken");
    const response = await axios.post<IAuthResponse>(
      `${API_URL}${getAuthUrl("/login/access-token")}`,
      {
        refreshToken,
      },
      {
        headers: getContentType(),
      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response;
  },
};
