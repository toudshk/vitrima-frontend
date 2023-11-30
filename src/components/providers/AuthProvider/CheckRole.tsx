import { useRouter } from 'next/router'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/components/shared/types/auth.types'


const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyContractor },
}) => {
	const { user } = useAuth()

	const router = useRouter()

	const Children = () => <>{children}</>

	
    if(isOnlyContractor) return <Children />

	if (user?.isAdmin) return <Children />

	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	const isUser = user && !user.isAdmin && !user.isContractor

	if (isUser) return <Children />
	
}

export default CheckRole