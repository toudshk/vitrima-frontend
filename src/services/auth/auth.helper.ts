import Cookies from "js-cookie";

import { IAuthResponse, ISignUpApplicant, ITokens } from "@/store/user/user.interface";

export const saveTokensStorage = (data: ITokens) => {
  // Устанавливаем accessToken с временем жизни 30 минут (1 / 48 дней)
  Cookies.set("accessToken", data.accessToken, { expires: 1 / 48, path: '/', sameSite: 'Lax' });

  // Устанавливаем refreshToken с временем жизни 30 дней
  Cookies.set("refreshToken", data.refreshToken, { expires: 30, path: '/', sameSite: 'Lax' });
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
    localStorage.setItem("user", JSON.stringify(data.user));
 
};

export const removeTokensStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
