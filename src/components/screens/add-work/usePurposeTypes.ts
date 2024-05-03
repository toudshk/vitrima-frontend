

import { WorkService } from '@/services/work/work.service'

import { useQuery } from 'react-query'

export const useTypePurpose = () => {
	const queryData = useQuery('list of type purpose', () => WorkService.getPurposeTypes(), {
        select: ({ data }) =>
			data.map(
				(subType) => ({
					label: subType.title,
                    value: subType._id
				})
			),
		onError(error) {
			console.log(error, 'Ошибка')
		},
	})

	return queryData
}
