import { MessagesService } from "@/services/messages/messages.service"
import { useQuery } from "react-query"
import { useAuth } from "../useAuth"

export const useUnreadMessages = () => {
    const {user} = useAuth()
	const queryData = useQuery('list of unread messages', () => MessagesService.getUnreadMessages(user!._id))

	return queryData
}
