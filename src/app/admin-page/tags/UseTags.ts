"use client"

import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { TagService } from '@/services/tag/tag.service'
import { convertMongoDate } from '@/utils/date/ConverMongoDate'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'



export const useTags = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['tag list', debouncedSearch],
		() => TagService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(tag) => ({
						_id: tag._id,
						editUrl: getAdminUrl(`tag/edit/${tag._id}`),
						items: [tag.title],
					}) 
				),
			onError(error) {
				console.log(error, 'tag list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete tag',
		(tagId: string) => TagService.deleteTag(tagId),
		{
			onError(error) {
				console.log(error,'ошибка') 
				//toastError(error, 'Delete tag')
			},
			onSuccess() {
				console.log('удачно') 

				//toastr.success('Delete tag', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}