"use client"
import AdminHeader from '@/components/ui/Admin-table/AdminHeader'
import { Meta } from '@/utils/meta'
import {FC} from 'react'
import { useUsers } from './UseUsers'
import AdminTable from '@/components/ui/Admin-table/AdminTable/AdminTable'

const UserList:FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()

  return (
   <Meta title='Пользователи'>
        <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm}/>
        
        <AdminTable
				tableItems={data || []}
				headerItems={['Email', 'Date register']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
   </Meta>
  )
}

export default UserList