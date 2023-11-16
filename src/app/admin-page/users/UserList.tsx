import AdminHeader from '@/components/ui/Admin-table/AdminHeader'
import { Meta } from '@/utils/meta'
import {FC} from 'react'

const UserList:FC = () => {
  return (
   <Meta title='Пользователи'>
        <AdminHeader />
   </Meta>
  )
}

export default UserList