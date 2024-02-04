"use client"
import { IWork } from '@/components/shared/types/work.types'
import { ITableItem } from '@/components/ui/Admin-table/AdminTable/table.interface'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import { WorkService } from '@/services/work/work.service'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo} from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'


export const useWorks = () => {
	const {user} = useAuth()
	
	const queryData = useQuery(
		['work list'],
		() => WorkService.getWorks(),
		{
			select: ({ data }) =>
				data.map(
					(work) => ({
						_id: work._id,
						title:	work.title,
						images:	work.images,
						description:work.description
						
					})
				),
			onError(error) {
				console.log(error, 'work list')
			},
		}
	)


	
	

	const router = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create work', 
		(data) => WorkService.create(data),
		{
			onError(error) {
				toast.error(error)
			},
			onSuccess() {
				console.log('Create work', 'create was successful')
				router.push(`profile/${user?._id}`)
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete work',
		(workId: string) => WorkService.delete(workId, user?._id),
		{
			onError(error) {
				console.log(error, 'Delete work')
			},
			onSuccess() {
				console.log('Delete work', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			
			...queryData,
			
			deleteAsync,
			createAsync,
		}),
		[queryData, deleteAsync, createAsync]
	)
}