"use client";
import AdminHeader from "@/components/ui/Admin-table/AdminHeader";
import { Meta } from "@/utils/meta";
import { FC } from "react";
import { useUsers } from "./UseUsers";
import AdminTable from "@/components/ui/Admin-table/AdminTable/AdminTable";

const UserList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers();

  const contractorItems = data?.filter((item) => item.isContractor === true);
  const nonContractorItems = data?.filter((item) => item.isContractor !== true);

  return (
    <Meta title="Пользователи">
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
      <div className="flex  gap-4 mx-4">
        <div className='w-full'>
          <h1 className="text-2xl font-semibold">Подрядчики</h1>
          <AdminTable
            tableItems={contractorItems || []}
            headerItems={["Email", "Date register"]}
            isLoading={isLoading}
            removeHandler={deleteAsync}
          />
        </div>
        <div className='w-full'>
          <h1  className="text-2xl font-semibold">Соискатели</h1>

          <AdminTable
            tableItems={nonContractorItems || []}
            headerItems={["Email", "Date register"]}
            isLoading={isLoading}
            removeHandler={deleteAsync}
          />
        </div>
      </div>
    </Meta>
  );
};

export default UserList;
