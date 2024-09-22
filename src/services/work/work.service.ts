import axios, { axiosClassic } from "@/api/interceptors"
import { IWorkEditInput, IWorkTypeEditInput } from "@/app/add-work/edit-work.interface"
import { IBuildingTechnique, ISubType, IWork, IWorkType } from "@/components/shared/types/work.types"

import { API_URL, getWorkUrl } from "../../config/api.config"
import { IAddWork } from "@/store/work/work.interface"
import { IFilterInput } from "@/components/screens/filter/Filter.interface"
import { AxiosRequestConfig } from "axios"

export const WorkService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IWork>(getWorkUrl(`/by-slug/${slug}`))
	},

	async getByContractor(id: any) {
		return axiosClassic.get<IWork[]>(getWorkUrl(`/by-contractor/${id}`))
	},

	
	async create(data: IWorkEditInput) {
		const response = await axiosClassic.post<IAddWork>(
			`${API_URL}${getWorkUrl('/create')}`, data
		)
		return response
	},

	async setMainWork(_id: any, workId: string){
		return axios.put<string>(getWorkUrl(`/set-main-work`),{_id, workId} )

	},

	async update(_id: string, data: IWorkEditInput) {
		
		return axios.put<string>(getWorkUrl(`/${_id}`), data)
	},
	async updateCountViews(slug: string) {
		return axiosClassic.post(getWorkUrl('/update-count-opened'), {
			slug,
		})
	},
	

	async delete(_id: string, contractorId: string) {
	
		const config: AxiosRequestConfig = {
		  data: { contractorId }, // Передаем contractorId в виде данных
		};
	  
		return axios.delete<string>(getWorkUrl(`/${_id}`), config);
	  },
	

	  async getWorksBySearch(slug: string, searchTerm?: string) {
	
		return axiosClassic.get<IWork[]>(getWorkUrl(`/search/${slug}`), {
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
	async getPurposeTypes() {
		return axiosClassic.get<IWorkType[]>(getWorkUrl('/purpose-types'))
	
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
		return await axiosClassic.get<ISubType[]>(getWorkUrl(`/by-work-type/${id}`))
	},

	async getBuildingTechniqueForArchitecture() {
		return await axiosClassic.get<IBuildingTechnique[]>(getWorkUrl(`/building-technique`))
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
		const queryParams = { ...filters };

		
		try {
		  const response = await axiosClassic.get(apiUrl, { params: queryParams });
	
		  return response.data;
	
		} catch (error) {
		  console.error('Error fetching work by work type', error);
		  throw error;
		}
	  },
	
	  async getWorksWithPagination(slug: any, filters: any,pageParam: number  ) {
	
		const data = await this.getWorkByWorkType(slug, { ...filters, _page: pageParam, _limit: 8});
		
		
		return {
		  data: data,
		  pageParam: pageParam
		};
	  },
	async createSubType(data: IWorkTypeEditInput) {
		
		const response = await axiosClassic.post<ISubType>(
			`${API_URL}${getWorkUrl('/create-sub-type')}`, data
		)
		return response
	},
	
	
}
