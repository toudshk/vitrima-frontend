import { axiosClassic } from "@/api/interceptors"
import { IWorkEditInput } from "@/app/add-work/edit-work.interface"
import { IWork } from "@/components/shared/types/work.types"
import axios from "axios"
import { getWorkUrl } from "../../config/api.config"

export const WorkService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IWork>(getWorkUrl(`/by-slug/${slug}`))
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IWork[]>(getWorkUrl(`/by-actor/${actorId}`))
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IWork[]>(getWorkUrl(`/by-genres`), {
			genreIds,
		})
	},

	async create() {
		return axios.post<string>(getWorkUrl(''))
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.post(getWorkUrl('/update-count-opened'), {
			slug,
		})
	},

	async update(_id: string, data: IWorkEditInput) {
		return axios.put<string>(getWorkUrl(`/${_id}`), data)
	},

	async delete(_id: string) {
		return axios.delete<string>(getWorkUrl(`/${_id}`))
	},

	async getMovies(searchTerm?: string) {
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
