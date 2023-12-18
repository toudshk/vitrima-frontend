"use client"

import { ITableItem } from '@/components/ui/Admin-table/AdminTable/table.interface'
import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { WorkService } from '@/services/work/work.service'
import { convertMongoDate } from '@/utils/date/ConverMongoDate'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'



export const useAdminWorks = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['work list', debouncedSearch],
		() => WorkService.getWorks(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(work): ITableItem => ({
						_id: work._id,
						editUrl: getAdminUrl(`work/edit/${work._id}`),
						items: [work.title, convertMongoDate(work.createdAt)],
					}) 
				),
			onError(error) {
				console.log(error, 'work list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete work',
		(workId: string ) => WorkService.delete(workId),
		{
			onError(error) {
				console.log(error,'ошибка') 
				//toastError(error, 'Delete work')
			},
			onSuccess() {
				console.log('удачно') 

				//toastr.success('Delete work', 'delete was successful')
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