import AdminActions from './AdminActions/AdminActions'
import { IAdminTableItem } from './table.interface'
import { FC } from 'react'

import styles from './AdminTable.module.scss'

const AdminTableItem: FC<any> = ({ tableItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value: any) => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</div>
	)
}

export default AdminTableItem