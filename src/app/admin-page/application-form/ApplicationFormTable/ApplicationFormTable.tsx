
import { FC} from 'react'


import styles from './ApplicationFormTable.module.scss'
import AdminTableHeader from '@/components/ui/Admin-table/AdminTable/AdminTableHeader'
import SkeletonLoader from '@/components/ui/skeleton-loader/skeletonLoader'
import ApplicationTableItem from './ApplicationTableItem/ApplicationTableItem'
import { ITableItem } from '@/components/ui/Admin-table/AdminTable/table.interface'

interface IAdminTable {
	tableItems: any
	headerItems: string[]
	isLoading: boolean
	}

const ApplicationFormTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
}) => {
	return (
		<div  >
			<AdminTableHeader headerItems={headerItems} />

			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem: ITableItem) => (
					<>
					<ApplicationTableItem
						key={tableItem._id}
						tableItem={tableItem}
					
					/>
				
					</>
				))
			) : (
				<div className={styles.notFound}>Объекты не найдены</div>
			)}
		</div>
	)
}

export default ApplicationFormTable