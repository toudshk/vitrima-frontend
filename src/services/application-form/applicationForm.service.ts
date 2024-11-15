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
 
  async getAllByMemberId(memberId:string) {
    return axiosClassic.get(getApplicationFormUrl(`/by-member/${memberId}`), {})
  }
};
