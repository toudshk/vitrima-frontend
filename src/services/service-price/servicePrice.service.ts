import axios, { axiosClassic}  from "@/api/interceptors"

import { API_URL, getServicePrice, getWorkUrl } from "../../config/api.config"

import { IServicePrice } from "@/components/shared/types/servicePrice.types"

import { IAddServicePrice } from "@/store/servicePrice/servicePrice.interface"
import { IServicePriceEditInput } from "@/components/screens/settings-profile/service-and-price/service-price-edit/edit-servicePrice.interface"

export const ServicePriceService = {
	

	async getByContractor(id: string) {
		
		return axiosClassic.get<IServicePrice[]>(getServicePrice(`/by-contractor/${id}`))
	},


	async create(data: IServicePriceEditInput) {
		
		const response = await axiosClassic.post<IAddServicePrice>(
			`${API_URL}${getServicePrice('')}`, data
		)
		return response
	},
	

	async update(_id: string, data: IServicePriceEditInput) {
		return axios.put<string>(getServicePrice(`/${_id}`), data)
	},
	

	async delete(_id: string) {
		return axios.delete<string>(getServicePrice(`/${_id}`))
	},

	async getWorks(searchTerm?: string) {
		return axiosClassic.get<IServicePrice[]>(getServicePrice(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getById(_id: string) {
		return axios.get<IServicePriceEditInput>(getServicePrice(`/${_id}`))
	},

	
}
