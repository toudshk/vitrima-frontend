"use client"
import { useAuth } from '@/hooks/useAuth'
import { MessagesService } from '@/services/messages/messages.service'

import { ChangeEvent, useMemo} from 'react'
import { useMutation, useQuery } from 'react-query'
import { IMessage } from './Chat.types'


export const useMessages = (id: string) => {
	const {user} = useAuth()
	
	
	const queryData = useQuery(
		['message list', id],
		
		() =>  MessagesService.getMessages(id),
		{
			select: data => data,
			onSuccess: (data) => {
			
				console.log('Received data:', data);
			  },
			onError(error) {
				console.log(error, 'work list')
		

			},
		}
	)


	
	


	const { mutateAsync: createAsync } = useMutation(
		'create message', 
		(data: any) => MessagesService.createMessage(data),
		{
			onError(error) {
				console.log(error, 'Create work')
			},
			onSuccess() {
				queryData.refetch();
				console.log('Create work', 'create was successful')
				
			},
		}
	)

	
	return useMemo(
		() => ({
			
			...queryData,
			createAsync,
		}),
		[queryData, createAsync]	
	)
}