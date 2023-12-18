import axios, { axiosClassic } from "@/api/interceptors"
import { IWorkEditInput, IWorkTypeEditInput } from "@/app/add-work/edit-work.interface"
import { ISubType, IWork, IWorkType } from "@/components/shared/types/work.types"

import { API_URL, getWorkUrl } from "../../config/api.config"
import { IAddWork } from "@/store/work/work.interface"
import { IFilterInput } from "@/components/screens/filter/Filter.interface"

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

	async getWorkTypes() {
		return axiosClassic.get<IWorkType[]>(getWorkUrl('/work-types'))
	
	},
	async getWorkTypeById(_id: string) {
		return axiosClassic.get<IWorkType>(getWorkUrl(`/work-type/${_id}`))
	},
	async createWorkType(data: IWorkTypeEditInput) {
		
		const response = await axiosClassic.post<IAddWork>(
			`${API_URL}${getWorkUrl('/create-work-type')}`, data
		)
		return response
	},


	async getSubTypeByWorkType(id: string) {
		return axiosClassic.get<ISubType[]>(getWorkUrl(`/by-work-type/${id}`))
	},
	
	async getSimilarWorks(subTypes: string[]) {
		const queryString = subTypes.map(subType => `subTypes=${encodeURIComponent(subType)}`).join('&');

		try {
			const response = await axiosClassic.get(getWorkUrl(`/get-similar-works?${queryString}`));
			return response.data;
		} catch (error) {
			console.error('Error fetching similar works', error);
			throw error;
		}
	},
	
	
	async getWorkByWorkType(slug: string, filters: IFilterInput = {}) {
		
		const apiUrl = getWorkUrl(`/get-work-by-work-type/${slug}`);
		const queryParams = { ...filters }; // Добавьте ваши параметры запроса
	
		try {
		  const response = await axiosClassic.get(apiUrl, { params: queryParams });
		  
		  return response.data;

		} catch (error) {
		  console.error('Error fetching work by work type', error);
		  throw error;
		}
	  },
	async createSubType(data: IWorkTypeEditInput) {
		
		const response = await axiosClassic.post<ISubType>(
			`${API_URL}${getWorkUrl('/create-sub-type')}`, data
		)
		return response
	},
	
}
