import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'


import styles from './SearchList.module.scss'
import { IWidgetWork } from '../work.types'

const SearchList: FC<{ works: IWidgetWork[] }> = ({ works }) => {
	return (
		<div className={styles.list}>
			{works.length ? (
				works.map((work) => (
					<Link key={work._id} href={`/work/${work.slug}`}>
						
							<Image
								src={work.images[0] || ''}
								width={50}
								height={50}
								objectFit="cover"
								objectPosition="top"
								alt={work.title}
								draggable={false}
							/>
							<span>{work.title}</span>
						
					</Link>
				))
			) : (
				<div className="text-white text-center my-4">Таких работ нет</div>
			)}
		</div>
	)
}

export default SearchList