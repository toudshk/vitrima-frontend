import { useRouter } from 'next/navigation'
import { FC } from 'react'


import styles from './AdminActions.module.scss'

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
    const router = useRouter()

	return (
		<div className={styles.actions}>
			<button onClick={() =>router.push(editUrl)}>
				изменить
			</button>
			<button onClick={removeHandler}>
				удалить 
			</button>
		</div>
	)
}

export default AdminActions