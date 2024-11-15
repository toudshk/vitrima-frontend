import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import AddBuilderForProject from "@/components/screens/project/finished-project/add-builder/AddBuilderForProject";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <AddBuilderForProject/>
    </>
  );
};

export default Page;
