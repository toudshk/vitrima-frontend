import { AuthService } from '@/services/auth/auth.service'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse, ISignContractor, ISignUpApplicant, InterfaceEmailPassword } from './user.interface'
import { errorCatch } from '@/api/api.helpers'

export const registerApplicant = createAsyncThunk<IAuthResponse, ISignUpApplicant>(
	'auth/register/applicant',
	async ({ email, password, nickname }, thunkApi) => {
		try {
			const response = await AuthService.registerApplicant(email, password, nickname)    
			return response.data
		} catch (error) {
            return thunkApi.rejectWithValue(error)
		}
	}
)

export const registerContractor = createAsyncThunk<IAuthResponse, ISignContractor>(
	'auth/register/applicant',
	async ({ email, password, nickname, inn }, thunkApi) => {
		try {
			const response = await AuthService.registerContractor(email, password, nickname, inn)    
			return response.data
		} catch (error) {
            return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password)
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)


export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout()
})



export const checkAuth = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
	'auth/check-auth',
	async (_,thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
            if(errorCatch(error) === 'токен не является строкой'){
                thunkApi.dispatch(logout())
            }
			return thunkApi.rejectWithValue(error)
		}
	}
)

