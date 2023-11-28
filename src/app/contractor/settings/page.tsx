"use client"

import SettingsProfile from '@/components/screens/settings-profile/SettingsProfile'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'

const page:FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} = useAuth() 
  return (
    <SettingsProfile user={user}/>
  )
}



export default page