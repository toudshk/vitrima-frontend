import { ChangeEvent, FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "./Search.module.scss";
import SearchList from "./SearchList/SearchList";
import { WorkService } from "@/services/work/work.service";
import SearchField from "@/components/ui/Search-field/SearchField";

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 100);
	const pathname = usePathname().substring(1);
	const [showList, setShowList] = useState(false);
  
	const {
	  isSuccess,
	  data: popularWorks,
	  isLoading,
	} = useQuery(
	  ['search work list', debouncedSearch],
	  () => WorkService.getWorksBySearch(pathname, debouncedSearch),
	  {
		select: ({ data }) => data,
		enabled: !!debouncedSearch,
	  }
	);
  
	useEffect(() => {
	  setShowList(isSuccess);
	}, [isSuccess]);
  
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
	  setSearchTerm(e.target.value);
	};
  
	if (pathname !== 'interior' && pathname !== 'architecture') {
	  // Если текущий путь не interior и не architecture, не рендерим компонент
	  return null;
	}
  
	return (
	  <div className={styles.searchContainer}>
		<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
  
		<div
		  className={clsx(styles.searchListContainer, { [styles.fadeIn]: showList })}
		>
		  {showList && <SearchList works={popularWorks || []} setSearchTerm={setSearchTerm} />}
		</div>
	  </div>
	);
  };
  
  export default Search;