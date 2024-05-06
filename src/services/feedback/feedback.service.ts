import axios, { axiosClassic } from "@/api/interceptors";
import { getFeedBackUrl } from "@/config/api.config";

export const FeedbackService = {
  async createFeedback(data: any) {
    const response = await axios.post(getFeedBackUrl("/create-feedback"), data);
    return response;
  },
  async getAll() {
    const response = await axios.get(getFeedBackUrl("/get-all"));
    console.log(response)
    return response
  },
};
