"use client"
import { useAuth } from '@/hooks/useAuth'
import { ChatsService } from '@/services/chat/chat.service'

import { ChangeEvent, useMemo} from 'react'
import { useMutation, useQuery } from 'react-query'


export const useChats = (id: string) => {
	const {user} = useAuth()
	
	
	const queryData = useQuery(
		['chat list', id],
		
		() =>  ChatsService.getChats(id),
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
	
	return useMemo(
		() => ({
			...queryData,
			
		}),
		[queryData]	
	)
}