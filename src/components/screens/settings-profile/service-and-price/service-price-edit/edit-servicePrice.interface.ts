import { IServicePrice } from '@/components/shared/types/servicePrice.types';

export interface  IServicePriceEditInput
	extends Omit<IServicePrice, '_id'  > {
	
}