
import { WorkService } from '@/services/work/work.service'

import { useQuery } from 'react-query'


export const useTypeWorks = () => {
	const queryData = useQuery('list of type works', () => WorkService.getWorkTypes(), {
		select: ({ data }) =>
			data.map(
				(workType) => ({
					title: workType.title,
					slug: workType.slug,
                    _id: workType._id
				})
			),
		onError(error) {
			console.log(error, 'категории работ')
		},
	})

	return queryData
}
