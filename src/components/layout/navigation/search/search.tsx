import { ChangeEvent, FC, useState } from 'react'
import { useQuery } from 'react-query'


import { useDebounce } from '@/hooks/useDebounce'


import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { WorkService } from '@/services/work/work.service'
import SearchField from '@/components/ui/Search-field/SearchField'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data: popularWorks } = useQuery(
		['search work list', debouncedSearch],
		() => WorkService.getWorks(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList works={popularWorks || []} />}
		</div>
	)
}

export default Search