export interface IApplicant {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  nickname: string;
  isContractor: boolean;
  isAdmin: boolean;
  works: string[];
  image: string;
  subscriptions?: string[];
  saved?: string[];
  isWorker: boolean
  isInspector: boolean

}
interface ISocialProfiles {
  vk?: string;
  instagram?: string;
  telegram?: string;
  webSite?: string;
}
export interface IWorker extends IApplicant {}
export interface IContractor extends IApplicant {
  inn: string;
  description: string;
  subscribers?: string[];
  location?: any;
  isSubscribe?: boolean;
  dayOfPayment?: any;
  socialProfiles?: ISocialProfiles;
}
