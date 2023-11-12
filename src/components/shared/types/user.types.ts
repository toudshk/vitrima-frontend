export interface IApplicant {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  nickname: string;
isContractor: boolean
  isAdmin: boolean

}
export interface IContractor extends IApplicant {
  inn: string
	

 }