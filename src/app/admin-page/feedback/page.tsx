import { NextPageAuth } from '@/components/shared/types/auth.types'
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation'
import {FC} from 'react'

const page: NextPageAuth = () => {
  return (
    <>
    <AdminNavigation/>
 
    </>
  )
}

page.isOnlyAdmin = true

export default page