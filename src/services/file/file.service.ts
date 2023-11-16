import axios from 'axios'

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return axios.post<{ url: string; name: string }[]>('/files', file, {
			params: {
				folder,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}
