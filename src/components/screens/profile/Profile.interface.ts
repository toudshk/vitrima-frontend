export interface IData {
   
      isContractor: boolean;
      nickname: string;
      email: string;
      inn: string;
      subscribers: string[];
      // Другие свойства пользователя
  
    
  }

  export interface IWorks{
    price: number;
    title: string;
    description: string;
    images: string[];
    slug: string;
    tags: string[];
    contractorId: string;
    
  }