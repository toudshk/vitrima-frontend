"use client";

import { FC, useState } from "react";
import { useFeedback } from "./UseFeedback";
import AdminTable from "@/components/ui/Admin-table/AdminTable/AdminTable";
import { useUserInfo } from "@/components/screens/chat/useUserInfo";

const FeedbackList: FC = () => {
  let id;
  const { data, isLoading } = useFeedback();
  return (
    <div className="max-w-[1736px] mx-10">
      <AdminTable
        tableItems={data || []}
        headerItems={["Фидбек", "Дата", "Почта"]}
        isLoading={isLoading}
        removeHandler={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default FeedbackList;
