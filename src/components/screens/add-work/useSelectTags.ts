import { IOption } from '@/components/ui/Select/Select.interface'
import { TagService } from '@/services/tag/tag.service'
import { useQuery } from 'react-query'


export const useSelectTags = (_id: any) => {
	const queryData = useQuery('list of tag', () => TagService.getTagsByWorkType(_id), {
		select: ({ data }) =>
			data.map(
				(tag) => ({
					label: tag.title,
					workType: tag.workType,
					value: tag._id,
				})
			),
		onError(error) {
			console.log(error, 'tag list')
		},
	})

	return queryData
}
