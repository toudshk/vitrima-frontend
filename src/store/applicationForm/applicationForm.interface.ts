export interface IAddApplicationForm {
  workType: string;
  objectArea?: number;
  purposeType?: string[];
  minPriceRealization?: number;
  maxPriceRealization?: number;
  startDateRealization?: string;
  format?: string;
  buildingTechnique?: string;
  startDate?: string;
  finishDate?: string;
  minPrice?: number;
  maxPrice?: number;
  images?: string[];
  phoneNumber: string;
  email: string;
  name: string;
  tags?: string[];
  description?: string;
  subTypes?: string[];
  location?: any;
  projectId: string;
  applicantId?: string;
  password: string;
  isDesignProject?: boolean
  designProject?: string[]
}
