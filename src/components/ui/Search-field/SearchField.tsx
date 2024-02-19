import { ChangeEvent, FC } from 'react'


import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({searchTerm, handleSearch }) => {
	return (
		<div className={styles.search}>
			
			<input placeholder="Поиск" value={searchTerm} onChange={handleSearch}  onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Предотвращаем выполнение действия по умолчанию (например, отправку формы)
        // Дополнительные действия, которые вы хотите выполнить при нажатии Enter
      }
    }} />
		</div>
	)
}

export default SearchField