import { IContractor } from "@/components/shared/types/user.types";
import axios, { axiosClassic } from "@/api/interceptors";
import { ISettingsProfileInput } from "@/components/screens/settings-profile/settings.interface";
import { IApplicant } from "@/components/shared/types/user.types";
import { getPaymentUrl } from "@/config/api.config";
export const PaymentService = {


  async createPayment(userId:any) {
    return axios.post<any>(getPaymentUrl(`/`),{ userId });
  },
  async deletePayment(userId: any) {
    return axios.post(getPaymentUrl(`/delete-payment`), {userId})
  }
};
