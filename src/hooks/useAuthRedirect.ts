import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

export const useAuthRedirect = () => {
	const {user} = useAuth()

	const { push } = useRouter()
    
	const redirect = '/'
console.log(user)
	useEffect(() => {
		if (user) {push(redirect)}
		
	}, [user, redirect, push])
}
