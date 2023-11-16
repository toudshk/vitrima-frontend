import {ChangeEvent, FC} from 'react'
import styles from './AdminHeader.module.scss'

interface IAdminHeader{
    onclick?: () =>void
    searchTerm : string
    handleSearch: (event:ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader:FC = () => {
  return (
    <div>AdminHeader</div>
  )
}

export default AdminHeader