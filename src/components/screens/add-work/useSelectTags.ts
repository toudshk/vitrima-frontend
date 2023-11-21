import { IOption } from '@/components/ui/Select/Select.interface'
import { TagService } from '@/services/tag/tag.service'
import { useQuery } from 'react-query'


export const useSelectTags = () => {
	const queryData = useQuery('list of tag', () => TagService.getAll(), {
		select: ({ data }) =>
			data.map(
				(tag): IOption => ({
					label: tag.title,
					value: tag._id,
				})
			),
		onError(error) {
			console.log(error, 'tag list')
		},
	})

	return queryData
}
