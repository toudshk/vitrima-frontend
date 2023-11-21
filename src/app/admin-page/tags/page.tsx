import { NextPageAuth } from '@/components/shared/types/auth.types'
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation'
import {FC} from 'react'
import TagList from './TagList'

const page: NextPageAuth = () => {
  return (
    <>
    <AdminNavigation/>
 <TagList /> 
    </>
  )
}

page.isOnlyAdmin = true

export default page