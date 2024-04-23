import { IUser } from "../profile/Profile.interface"


export interface IMessage {
	id: number
	text: string
	createdAt: string
	sender: IUser
    receiver: string

status: string
}

export interface IChat {
	id: number
	messages: IMessage[]
	participants: IUser[]
}