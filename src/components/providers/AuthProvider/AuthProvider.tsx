"use client"

import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/components/shared/types/auth.types'


const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyContractor },
}) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const {  } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return !isOnlyAdmin && !isOnlyContractor && isOnlyContractor ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyContractor }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
