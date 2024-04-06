import { IContractor } from '@/components/shared/types/user.types';
import  axios, { axiosClassic }  from "@/api/interceptors"
import { ISettingsProfileInput } from '@/components/screens/settings-profile/settings.interface';
import { IApplicant } from "@/components/shared/types/user.types"
import { getUsersUrl } from "@/config/api.config"
export const UserService = {

	async getProfile() {
		return axios.get<IContractor>(getUsersUrl('/profile/takeinfouser'))
	},
	async updateProfile(data: ISettingsProfileInput) {
		
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getApplicant() {
		return axios.get<IApplicant>(getUsersUrl('/applicant/profile'))
	},
	async getContractor() {
		return axios.get<IApplicant>(getUsersUrl('/contractor/profile'))
	},
	async getUserById(userId: string) {
		return axios.get<IContractor>(getUsersUrl(`/${userId}`))
	},

	async applicantById(applicantId: string) {
		return axiosClassic.get<IApplicant>(getUsersUrl(`/applicant/${applicantId}`))
	},

	async activate(activationLink: any){
		return axiosClassic.get(getUsersUrl(`/activate/${activationLink}`))
	},

	async contractorById(contractorId: string) {
		return axiosClassic.get<IContractor>(getUsersUrl(`/contractor/${contractorId}`))
	},

	

	async getUsers(searchTerm?: string) {
		return axios.get<IApplicant[] | IContractor[]>(getUsersUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	

	 async updateUser(_id: string, data: ISettingsProfileInput) {
	 	return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},

	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},


	async subscribe(applicantId: string, contractorId:string) {
		return await axios.post(getUsersUrl(`/${applicantId}/subscribe/${contractorId}`))
	},
	async unSubscribe(applicantId: string, contractorId:string) {
		return await axios.post(getUsersUrl(`/${applicantId}/unsubscribe/${contractorId}`))
	},

	async addSavedWork(applicantId: string, workId:string) {
		return await axios.post(getUsersUrl(`/add-saved-work/${applicantId}/${workId}`))
	},
	
	async removeSavedWork(applicantId: string, workId:string) {
		return await axios.post(getUsersUrl(`/remove-saved-work/${applicantId}/${workId}`))
	},
	async removeAutoPayment(_id:string ){
		return await axios.post(getUsersUrl(`/remove-autopayment/${_id}`))
	}
}