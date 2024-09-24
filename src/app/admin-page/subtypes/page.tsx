import { NextPageAuth } from "@/components/shared/types/auth.types";
import AdminNavigation from "@/components/ui/Admin-navigation/AdminNavigation";
import { FC } from "react";
import SubTypeList from "./SubtypeList";

const page: NextPageAuth = () => {
  return (
    <>
      <AdminNavigation />
      <SubTypeList />
    </>
  );
};

page.isOnlyAdmin = true;

export default page;
