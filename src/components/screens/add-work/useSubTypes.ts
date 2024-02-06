
import { WorkService } from '@/services/work/work.service'

import { useQuery } from 'react-query'


export const useSubTypes = (_id: any) => {
	const queryData = useQuery('list of sub types', async () => await WorkService.getSubTypeByWorkType(_id), {
		select: ({ data }) =>
			data.map(
				(subType) => ({
					label: subType.title,
					description: subType.description,
                    image: subType.image,
                    value: subType._id
				})
			),
		onError(error) {
			console.log(error, 'Ошибка')
		},
	})

	return queryData
}
