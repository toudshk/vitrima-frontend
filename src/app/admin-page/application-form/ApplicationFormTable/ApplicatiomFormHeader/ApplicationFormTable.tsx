import clsx from 'clsx'
import { FC } from 'react'

import styles from './AdminTable.module.scss'

const ApplicationFormHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
	return (
		<div className={clsx(styles.item, styles.itemHeader)}>
			{headerItems.map((value) => (
				<div key={value}>{value}</div>
			))}

			<div>Actions</div>
		</div>
	)
}

export default ApplicationFormHeader