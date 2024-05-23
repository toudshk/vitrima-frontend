"use client"

import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { FC, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

const AuthProvider: FC<{children: React.ReactNode}> = ({children}) => {

	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const pathname = usePathname()
	console.log(pathname)
	// useEffect(() => {
	// 	const accessToken = Cookies.get('accessToken')
	// 	if (accessToken) checkAuth()
	// }, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		console.log(refreshToken, user)
		if (!refreshToken && user) logout()
		if(user === undefined) {
			localStorage.removeItem("user");
		}
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</> 
	
}

export default AuthProvider
