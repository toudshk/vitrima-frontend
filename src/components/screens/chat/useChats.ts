"use client"
import { useAuth } from '@/hooks/useAuth'
import { ChatsService } from '@/services/chat/chat.service'
import { MessagesService } from '@/services/messages/messages.service'

import { ChangeEvent, useMemo, useState} from 'react'
import { useMutation, useQuery } from 'react-query'


export const useChats = (id: any) => {
	const [nonEmptyChats, setNonEmptyChats] = useState<any>([]);
  
	useQuery(
	  ['chat list', id],
	  async () => {
		const chats = await ChatsService.getChats(id);
  
		const chatsWithMessages = await Promise.all(
		  chats.map(async (chat: { _id: string }) => {
			const messages = await MessagesService.getMessages(chat._id);
			return { ...chat, hasMessages: messages.length > 0 };
		  })
		);
  
		const filteredChats = chatsWithMessages.filter(chat => chat.hasMessages);
  
		setNonEmptyChats(filteredChats);
  
		return chats; // Returning the original chats for useQuery
	  },
	  {
		onError: (error) => {
		  console.log(error, 'Error fetching chat list');
		},
	  }
	);
  
	return nonEmptyChats;
  };