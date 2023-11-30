import { FC } from 'react'


import styles from './AdminTable.module.scss'

import { ITableItem } from './table.interface'
import SkeletonLoader from '../../skeleton-loader/skeletonLoader'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'

interface IAdminTable {
	tableItems: ITableItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler: (id: string) => void
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
	removeHandler,
}) => {
	return (
		<div className='mx-32'>
			<AdminTableHeader headerItems={headerItems} />

			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						tableItem={tableItem}
						removeHandler={removeHandler}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	)
}

export default AdminTable