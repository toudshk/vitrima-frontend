import axios, { axiosClassic } from "@/api/interceptors";
import { getPaymentUrl } from "@/config/api.config";
export const PaymentService = {


  async createPayment(userId:any) {
    return axios.post<any>(getPaymentUrl(`/`),{ userId });
  },
  async deletePayment(userId: any) {
    return axios.post(getPaymentUrl(`/delete-payment`), {userId})
  }
};
