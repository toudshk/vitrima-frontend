"use client"
import AdminHeader from '@/components/ui/Admin-table/AdminHeader'
import { Meta } from '@/utils/meta'
import {FC} from 'react'
import { useTags } from './UseTags'
import AdminTable from '@/components/ui/Admin-table/AdminTable/AdminTable'

const TagList:FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useTags()

  return (
   <Meta title='Теги'>
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

export default TagList