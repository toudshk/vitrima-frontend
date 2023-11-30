import axios, { axiosClassic } from "@/api/interceptors"
import { IWorkEditInput } from "@/app/add-work/edit-work.interface"
import { IWork } from "@/components/shared/types/work.types"

import { API_URL, getWorkUrl } from "../../config/api.config"
import { IAddWork } from "@/store/work/work.interface"

export const WorkService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IWork>(getWorkUrl(`/by-slug/${slug}`))
	},

	async getByContractor(id: string) {
		return axiosClassic.get<IWork[]>(getWorkUrl(`/by-contractor/${id}`))
	},

	
	async create(data: IWorkEditInput) {
		console.log(data)
		const response = await axiosClassic.post<IAddWork>(
			`${API_URL}${getWorkUrl('/create')}`, data
		)
		return response
	},

	

	async update(_id: string, data: IWorkEditInput) {
		return axios.put<string>(getWorkUrl(`/${_id}`), data)
	},
	

	async delete(_id: string, contractorId: any) {
		return axios.delete<string>(getWorkUrl(`/${_id}`), contractorId)
	},
	

	async getWorks(searchTerm?: string) {
		return axiosClassic.get<IWork[]>(getWorkUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getById(_id: string) {
		return axiosClassic.get<IWorkEditInput>(getWorkUrl(`/${_id}`))
	},

	
}
