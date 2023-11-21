import { NextPageAuth } from '@/components/shared/types/auth.types'
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation'
import {FC} from 'react'
import WorkList from './WorkList'

const page: NextPageAuth = () => {
  return (
    <>
    <AdminNavigation/>
 <WorkList /> 
    </>
  )
}

page.isOnlyAdmin = true

export default page