import { IWork } from '@/components/shared/types/work.types'

export interface IWorkEditInput
	extends Omit<IWork, '_id' |'tags'| 'category' > {
	tags: string[]
	category: string
}