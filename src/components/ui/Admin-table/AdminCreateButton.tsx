import {FC} from 'react'
import MainButton from '../Button/MainButton'

const AdminCreateButton:FC<{onClick: () => void}> = ({onClick}) => {
  return (
    <MainButton onClick={onClick}>Новый объект</MainButton>
  )
}

export default AdminCreateButton