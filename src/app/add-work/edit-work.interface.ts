import { ISubType, IWork, IWorkType } from '@/components/shared/types/work.types'

export interface IWorkEditInput
	extends Omit<IWork, '_id' > {
	
}

export interface IWorkTypeEditInput
extends Omit<IWorkType, '_id' >{

}

export interface ISubTypeEditInput
extends Omit<ISubType, '_id' >{

}