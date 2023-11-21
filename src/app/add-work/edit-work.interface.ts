import { IWork } from '@/components/shared/types/work.types'

export interface IWorkEditInput
	extends Omit<IWork, '_id' > {
	
}