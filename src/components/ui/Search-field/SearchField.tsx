import { ChangeEvent, FC, useState } from 'react'


import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	const [isInputHighlighted, setInputHighlighted] = useState(false);
  
	return (
	  <div className={`${styles.search} ${isInputHighlighted ? styles.highlighted : ''}`}>
		<input
		  placeholder="Поиск"
		  value={searchTerm}
		  onChange={(e) => {
			handleSearch(e);
			setInputHighlighted(true); // Highlight the input when there's any change
		  }}
		  onBlur={() => setInputHighlighted(false)} // Remove highlight when the input loses focus
		  onKeyDown={(e) => {
			if (e.key === 'Enter') {
			  e.preventDefault();
			  // Additional actions you want to perform on Enter key press
			}
		  }}
		/>
	  </div>
	);
  };
  
  export default SearchField;