"use client"
import AdminHeader from '@/components/ui/Admin-table/AdminHeader'
import { Meta } from '@/utils/meta'
import {FC} from 'react'
import AdminTable from '@/components/ui/Admin-table/AdminTable/AdminTable'
import { useAdminWorks } from './UseAdminWorks'

const WorkList:FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useAdminWorks()

  return (
   <Meta title='Услуги'>
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

export default WorkList