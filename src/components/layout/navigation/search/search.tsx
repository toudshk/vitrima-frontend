import { ChangeEvent, FC, useState } from 'react'
import { useQuery } from 'react-query'
import { usePathname } from 'next/navigation'
 
import { useDebounce } from '@/hooks/useDebounce'
import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { WorkService } from '@/services/work/work.service'
import SearchField from '@/components/ui/Search-field/SearchField'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const pathname = usePathname().substring(1)

	const { isSuccess, data: popularWorks, isLoading } = useQuery(
		['search work list', debouncedSearch],
		() => WorkService.getWorksBySearch(pathname, debouncedSearch),
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
			{isSuccess && <SearchList works={popularWorks || []} isLoading={isLoading}/>}
		</div>
	)
}

export default Search