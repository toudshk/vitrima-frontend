"use client";

import { FC, useState } from "react";
import { useFeedback } from "./UseFeedback";
import AdminTable from "@/components/ui/Admin-table/AdminTable/AdminTable";

const FeedbackList: FC = () => {
  const { data, isLoading } = useFeedback();
  console.log(data);

  return (
    <div className="max-w-[1736px] mx-10">

      <AdminTable
        tableItems={data || []}
        headerItems={["Feedback"]}
        isLoading={isLoading}
        removeHandler={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default FeedbackList;
