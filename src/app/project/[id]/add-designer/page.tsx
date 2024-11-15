import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import AddDesignerForProject from "@/components/screens/project/finished-project/add-designer/AddDesignerForProject";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <AddDesignerForProject/>
    </>
  );
};

export default Page;
