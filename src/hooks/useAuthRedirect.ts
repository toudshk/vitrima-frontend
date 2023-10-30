import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

export const useAuthRedirect = () => {
	const {applicant, contractor} = useAuth()

	const {  push } = useRouter()
    const user = applicant || contractor;
	const redirect = '/'

	useEffect(() => {
		if (user) push(redirect)
	}, [user,applicant, contractor, redirect, push])
}
