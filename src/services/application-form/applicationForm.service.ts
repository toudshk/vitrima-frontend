import { axiosClassic } from "@/api/interceptors"

import { API_URL, getApplicationFormUrl } from "../../config/api.config"
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface"

export const ApplicationFormService = {
	

	
	async create(data: IAddApplicationForm) {
		const response = await axiosClassic.post<IAddApplicationForm>(
			`${API_URL}${getApplicationFormUrl('/create')}`, data
		)
		return response
	},

	
}
