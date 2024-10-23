import AdminActions from "./AdminActions/AdminActions";
import { IAdminTableItem } from "./table.interface";
import { FC } from "react";

import styles from "./AdminTable.module.scss";
import Image from "next/image";
import Link from "next/link";

const AdminTableItem: FC<any> = ({ tableItem, removeHandler }) => {
  return (
    <Link  className={styles.item} href={`/profile/${tableItem._id}`}>
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
    </Link>
  );
};

export default AdminTableItem;
