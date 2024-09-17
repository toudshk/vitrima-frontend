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
}
