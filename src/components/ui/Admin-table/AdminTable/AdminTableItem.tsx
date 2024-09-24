import AdminActions from "./AdminActions/AdminActions";
import { IAdminTableItem } from "./table.interface";
import { FC } from "react";

import styles from "./AdminTable.module.scss";
import Image from "next/image";

const AdminTableItem: FC<any> = ({ tableItem, removeHandler }) => {
  return (
    <div className={styles.item}>
      {tableItem.items.map((value: any) => (
        <div key={value}>
          {value.startsWith("/uploads") ? (
            <Image src={value} width={150} height={150} alt={""}/>
          ) : (
            <div>{value}</div>
          )}
        </div>
      ))}

      <AdminActions
        editUrl={tableItem.editUrl}
        removeHandler={() => removeHandler(tableItem._id)}
      />
    </div>
  );
};

export default AdminTableItem;
