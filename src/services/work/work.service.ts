import { axiosClassic } from "@/api/interceptors"
import { IWorkEditInput } from "@/app/add-work/edit-work.interface"
import { IWork } from "@/components/shared/types/work.types"
import axios from "axios"
import { API_URL, getWorkUrl } from "../../config/api.config"
import { IAddWork } from "@/store/work/work.interface"

export const WorkService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IWork>(getWorkUrl(`/by-slug/${slug}`))
	},

	async getByContractor(id: string) {
		return axiosClassic.get<IWork[]>(getWorkUrl(`/by-contractor/${id}`))
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IWork[]>(getWorkUrl(`/by-genres`), {
			genreIds,
		})
	},

	async create(data: IWorkEditInput) {
		console.log(data)
		const response = await axiosClassic.post<IAddWork>(
			`${API_URL}${getWorkUrl('/create')}`, data
		)
		return response
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.post(getWorkUrl('/update-count-opened'), {
			slug,
		})
	},

	async update(_id: string, data: IWorkEditInput) {
		return axios.put<string>(getWorkUrl(`/${_id}`), data)
	},
	

	async deleteWork(_id: string) {
		return axios.delete<string>(getWorkUrl(`/${_id}`))
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
		return axios.get<IWorkEditInput>(getWorkUrl(`/${_id}`))
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IWork[]>(
			getWorkUrl('/most-popular')
		)

		return movies
	},
}
