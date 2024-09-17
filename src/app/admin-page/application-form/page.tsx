import { NextPageAuth } from '@/components/shared/types/auth.types'
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation'
import {FC} from 'react'
import ApplicationFormList from './ApplicationFormList'


const page: NextPageAuth = () => {
  return (
    <>
    <AdminNavigation/>
    <ApplicationFormList />
    </>
  )
}

page.isOnlyAdmin = true

export default page