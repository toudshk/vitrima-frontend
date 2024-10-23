"use client";

import { FC } from "react";
import { useApplicationForm } from "./UseApplicationForm";
import ApplicationFormTable from "./ApplicationFormTable/ApplicationFormTable";

const ApplicationFormList: FC = () => {
  
  const { data, isLoading } = useApplicationForm();

  return (
    <div className="max-w-[1736px] mx-10">
      <ApplicationFormTable
        tableItems={data || []}
        headerItems={["Заявки"]}
        isLoading={isLoading}
        
      />
    </div>
  );
};

export default ApplicationFormList;
