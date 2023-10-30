export interface IApplicant {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  nickname: string;
}
export interface IContractor extends IApplicant {
  inn: string
 }