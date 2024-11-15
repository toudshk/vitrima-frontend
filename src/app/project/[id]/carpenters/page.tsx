import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import Carpenters from "@/components/screens/project/finished-project/carpenters/Carpenters";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <Carpenters />
    </>
  );
};

export default Page;
