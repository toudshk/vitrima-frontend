import { IApplicationForm } from "./../../components/shared/types/applicationForm";
import { axiosClassic } from "@/api/interceptors";

import { API_URL, getApplicationFormUrl } from "../../config/api.config";
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface";

export const ApplicationFormService = {
  async create(data: IAddApplicationForm) {
    const response = await axiosClassic.post<IAddApplicationForm>(
      `${API_URL}${getApplicationFormUrl("/create")}`,
      data
    );
    return response;
  },

  async getAll() {
    return axiosClassic.get<IApplicationForm[]>(getApplicationFormUrl(``), {});
  },
  async createChat(senderId: string, receiverId: string, formId: string) {
    const response = axiosClassic.post(getApplicationFormUrl("/create-chat"), {
      senderId,
      receiverId,
      formId,
    });
    return response;
  },
};
