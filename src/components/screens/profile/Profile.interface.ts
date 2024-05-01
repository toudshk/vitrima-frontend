export interface IUser {
 
    isContractor: boolean;
    nickname: string;
    email: string;
    inn?: string;
    subscribers?: string[];
    image: string
    // Другие свойства пользователя
    subscriptions?: string[];
    description?: string
}

export interface IWorks {
  
  price: number;
  title: string;
  description: string;
  images: string[];
  slug: string;
  tags: string[];
  contractorId: string;
}

export interface ContractorProfileProps {
  userData: IUser;
  isLoading: boolean
  id: string;
}

export interface ApplicantProfileProps {
  data: any;
  isLoading: boolean
  id: any
}