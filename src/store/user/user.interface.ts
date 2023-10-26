import { IUser } from "@/components/shared/types/user.types"


export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserInitialState {
	user: IUserState | null
	isLoading: boolean
}
export interface InterfaceEmailPassword {
	email: string
	password: string
}
export interface ISignUpApplicant {
	email: string
	password: string
	nickname: string
}
export interface ISignContractor {
	email: string
	password: string
	nickname: string
	inn: string
}
export interface IAuthResponse extends ITokens {
	user: IUser & {
		isAdmin: boolean
	}
}