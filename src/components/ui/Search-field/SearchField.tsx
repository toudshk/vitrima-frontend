import { ChangeEvent, FC, useState } from 'react'


import styles from './SearchField.module.scss'
import { useDebounce } from '@/hooks/useDebounce'



const SearchField: FC= () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
	  setSearchTerm(e.target.value);
	};


	return (
		<div className={styles.search}>
			<input placeholder="Search" value={searchTerm} onChange={handleSearch} />
		</div>
	)
}

export default SearchField