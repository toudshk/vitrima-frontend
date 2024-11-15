import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import FinishedProject from "@/components/screens/project/finished-project/FinishedProject";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <FinishedProject/>
    </>
  );
};

export default Page;
