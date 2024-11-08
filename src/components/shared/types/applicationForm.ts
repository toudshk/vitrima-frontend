export interface IApplicationForm {
  _id: string;
  workType: string;
  objectArea: number;
  purposeType: string;
  buildingTechnique: string;
  startDate: string;
  finishDate: string;
  minPrice: number;
  maxPrice: number;
  images: string[];
  tags: string[];
  description: string;
  createdAt: string;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  format: string;
  minPriceRealization: number;
  maxPriceRealization: number;
  chatId: any;
  startDateRealization: string;
}
