import { NextPageAuth } from '@/components/shared/types/auth.types'
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation'
import {FC} from 'react'
import UserList from './UserList'

const page: NextPageAuth = () => {
  return (
    <>
    <AdminNavigation/>
 <UserList /> 
    </>
  )
}

page.isOnlyAdmin = true

export default page