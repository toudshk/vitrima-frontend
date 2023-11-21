import { ChangeEvent, FC } from "react";
import styles from "./AdminHeader.module.scss";
import SearchField from "../Search-field/SearchField";
import AdminCreateButton from "./AdminCreateButton";

interface IAdminHeader {
  onClick?: () => void;
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  handleSearch,
  searchTerm,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.search}>
        <input
          placeholder="Поиск"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {onClick && <AdminCreateButton onClick={onClick} />}
    </div>
  );
};

export default AdminHeader;
