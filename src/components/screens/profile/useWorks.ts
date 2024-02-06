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
	const router = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create work', 
		(data: any) => WorkService.create(data),
		{
			onError(error: any) {
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
		(workId: string) => {
		  if (user?._id) {
			return WorkService.delete(workId, user._id);
		  } else {
			// Handle the case when user?._id is undefined
			return Promise.reject(new Error('user._id is undefined'));
		  }
		},
		{
		  onError(error) {
			console.log(error, 'Delete work');
		  },
		  onSuccess() {
			console.log('Delete work', 'delete was successful');
			
		  },
		}
	  );

	return useMemo(
		() => ({
			
			
			deleteAsync,
			createAsync,
		}),
		[ deleteAsync, createAsync]
	)
}