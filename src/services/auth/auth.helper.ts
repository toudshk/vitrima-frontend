import Cookies from "js-cookie";

import { IAuthResponse, ISignUpApplicant, ITokens } from "@/store/user/user.interface";

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
    localStorage.setItem("user", JSON.stringify(data));
 
};

export const removeTokensStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
