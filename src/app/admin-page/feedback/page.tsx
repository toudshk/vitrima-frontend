import { NextPageAuth } from '@/components/shared/types/auth.types'
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation'
import {FC} from 'react'
import FeedbackList from './FeedbackList'

const page: NextPageAuth = () => {
  return (
    <>
    <AdminNavigation/>
    <FeedbackList />
    </>
  )
}

page.isOnlyAdmin = true

export default page