import { IApplicationForm } from "./applicationForm";

export interface IChosenBuilders {
  _id: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  linkToPortfolio: string;
  price: number;
}

export interface IChosenDesigners {
  _id: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  linkToPortfolio: string;
  price: number;
}

export interface ICarpenter {
  _id: string;
  title: string;
  phoneNumber: string;
  email: string;
  address: string;
  linkToPortfolio: string;
  price: number;
  orderedItems: string;
  timeProduction: string;
  materials: string;
}

export interface IProject {
  _id: string;
  chosenDesigners?: IChosenDesigners | null;
  chosenBuilders?: IChosenBuilders | null;
  applicationForm?: IApplicationForm;
  drawings?: string[];
  chosenCarpenter?: ICarpenter[] | null;
  constructionManagement?: boolean;
  createdAt: string;
  applicantId: string;
  chatId?: any
}
