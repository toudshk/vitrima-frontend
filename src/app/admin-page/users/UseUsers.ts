"use client"

import { ITableItem } from '@/components/ui/Admin-table/AdminTable/table.interface'
import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user/user.service'
import { convertMongoDate } from '@/utils/date/ConverMongoDate'
import { getKeys } from '@/utils/object/getKeys'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'



export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getUsers(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user: { _id: any; email: string;  createdAt: string , isContractor: boolean}) => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)],
						isContractor: user.isContractor
					}) 
				),
			onError(error) {
				console.log(error, 'user list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string) => UserService.deleteUser(userId),
		{
			onError(error) {
				console.log(error,'ошибка') 
				//toastError(error, 'Delete user')
			},
			onSuccess() {
				console.log('удачно') 

				//toastr.success('Delete user', 'delete was successful')
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