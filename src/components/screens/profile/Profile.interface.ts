export interface IData {
 
    isContractor: boolean;
    nickname: string;
    email: string;
    inn: string;
    subscribers?: string[];
    image: string
    // Другие свойства пользователя
    subscriptions?: string[]
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
  data: IData;
  works: IWorks[];
  id: string;
}

export interface ApplicantProfileProps {
  data: IData;
  
  id: string
}