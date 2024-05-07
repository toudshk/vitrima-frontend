"use client"

import SettingsProfile from '@/components/screens/settings-profile/SettingsProfile'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const page:FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} = useAuth() 
  if (!user) {
    router.push('/')
  }
  return (

    <SettingsProfile user={user}/>
  )
}



export default page