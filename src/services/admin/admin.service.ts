import  axios  from "@/api/interceptors"
import { getUsersUrl } from "@/config/api.config"

export const AdminService = {
    async getCountContractors(){
        return axios.get<number>(getUsersUrl('/count/contractors'))
    },
    async getCountApplicants(){
        return axios.get<number>(getUsersUrl('/count/applicants'))
    }
}