import axios, { axiosClassic } from '@/api/interceptors'
import { ITagEditInput } from '@/app/admin-page/tags/edit-tage.interface'
import { ITag } from '@/components/shared/types/work.types'
import { getTagsUrl } from '@/config/api.config'


export const TagService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<ITag>(getTagsUrl(`/by-slug/${slug}`))
	},


	async create(data: ITagEditInput) {
	
		const response = await axios.post(getTagsUrl(''), data
		)
		return response
	},
	

	async update(_id: string, data: ITagEditInput) {
		return axios.put<string>(getTagsUrl(`/${_id}`), data)
	},

	async deleteTag(_id: string) {
		return axios.delete<string>(getTagsUrl(`/${_id}`))
	},

	async getTagsByWorkType(id: string) {
		return await axiosClassic.get<ITag[]>(getTagsUrl(`/by-work-type/${id}`))
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<ITag[]>(getTagsUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	// async getCollections() {
	// 	return axiosClassic.get<ICollection[]>(getTagsUrl('/collections'))
	// },

	async getById(_id: string) {
		return axios.get<ITagEditInput>(getTagsUrl(`/${_id}`))
	},

	async getPopularTags(limit: number = 4) {
		return axiosClassic.get<ITag[]>(getTagsUrl(`/popular`), {
			params: {
				limit,
			},
		})
	},
}
