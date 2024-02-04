import { IOption } from '@/components/ui/Select/Select.interface'
import { WorkService } from '@/services/work/work.service'
import { useQuery } from 'react-query'


export const useBuildingTechnique = () => {
	const queryData = useQuery('list of building technique', () => WorkService.getBuildingTechniqueForArchitecture(), {
		select: ({ data }) =>
			data.map(
				(item) => ({
					label: item.title,
					value: item._id,
                    description: item.description,
                    image: item.image
				})
			),
		onError(error) {
			console.log(error, '')
		},
	})

	return queryData
}
